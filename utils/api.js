import {
  RandomNumberApi,
  LetterApi,
  Letter,
  RandomNumber,
  DrawTossPayload,
} from 'echaloasuerte-js-sdk';
import Router from 'next/router';
import { asyncThrottle } from '../services/throttle';
import { logApiError } from './logger';
import recentDraws from '../services/recentDraws';
import { getDrawDataFromValues, getValuesFromDraw } from './draw';

import { analyticsTypesBySlug } from '../constants/analyticsTypes';
import { URL_SLUG_NUMBER, URL_SLUG_LETTER } from '../constants/urlSlugs';

const apisBySlug = {
  [URL_SLUG_NUMBER]: RandomNumberApi,
  [URL_SLUG_LETTER]: LetterApi,
};

const drawObjectBySlug = {
  [URL_SLUG_NUMBER]: RandomNumber,
  [URL_SLUG_LETTER]: Letter,
};

const apiDrawTypeBySlug = {
  [URL_SLUG_NUMBER]: 'randomNumber',
  [URL_SLUG_LETTER]: 'letter',
};

const apiToss = (urlSlug, privateId, payload = {}) => {
  const Api = apisBySlug[urlSlug];
  const functionName = `${apiDrawTypeBySlug[urlSlug]}Toss`; // functionName ~= randomNumberToss
  return new Api()[functionName](privateId, payload);
};

const apiCreate = (urlSlug, drawData) => {
  const Api = apisBySlug[urlSlug];
  const functionName = `${apiDrawTypeBySlug[urlSlug]}Create`; // functionName ~= randomNumberCreate
  const drawObject = drawObjectBySlug[urlSlug].constructFromObject(drawData);
  return new Api()[functionName](drawObject);
};

const apiRead = ({ urlSlug, drawId }) => {
  const Api = apisBySlug[urlSlug];
  const functionName = `${apiDrawTypeBySlug[urlSlug]}Read`; // functionName ~= randomNumberRead
  return new Api()[functionName](drawId);
};

// Publishing a draw is just tossing with a scheduledDate
const apiPublish = (urlSlug, privateId, dateScheduled) => {
  const payload = DrawTossPayload.constructFromObject({ schedule_date: dateScheduled });
  return apiToss(urlSlug, privateId, payload);
};

// eslint-disable-next-line import/prefer-default-export
export const toss = async ({
  values,
  privateId,
  urlSlug,
  setLoadingRequest,
  track,
  setAPIError,
  setQuickResult,
}) => {
  const analyticsType = analyticsTypesBySlug[urlSlug];
  const tsStart = new Date().getTime();
  setLoadingRequest(true);

  let shouldRedirect;
  let privateIdToToss;
  try {
    if (!privateId) {
      const drawData = getDrawDataFromValues({ urlSlug, values, isPublic: false });
      const newDraw = await apiCreate(urlSlug, drawData);
      shouldRedirect = true;
      privateIdToToss = newDraw.private_id;
    } else {
      privateIdToToss = privateId;
    }

    const tossResponse = await apiToss(urlSlug, privateIdToToss);
    track({
      mp: {
        name: `Toss - ${analyticsType}`,
        properties: { drawType: analyticsType },
      },
      ga: { action: 'Toss', category: analyticsType },
    });
    await asyncThrottle(tsStart);
    if (shouldRedirect) {
      Router.push(`/${urlSlug}/[id]`, `/${urlSlug}/${privateIdToToss}`);
    } else {
      setAPIError(false);
      setLoadingRequest(false);
      setQuickResult(tossResponse);
    }
  } catch (error) {
    logApiError(error, analyticsType);
    setAPIError(true);
    setLoadingRequest(false);
  }
};

export const publish = async ({ values, urlSlug, track, setLoadingRequest, setAPIError }) => {
  setLoadingRequest(true);
  const analyticsType = analyticsTypesBySlug[urlSlug];
  const { dateScheduled } = values;

  try {
    const drawData = getDrawDataFromValues({ urlSlug, values, isPublic: true });
    const newDraw = await apiCreate(urlSlug, drawData);
    await apiPublish(urlSlug, newDraw.private_id, dateScheduled);
    track({
      mp: {
        name: `Publish - ${analyticsType}`,
        properties: { drawType: analyticsType, drawId: newDraw.id },
      },
      ga: { action: 'Publish', category: analyticsType, label: newDraw.id },
    });

    const drawPath = `/${urlSlug}/${newDraw.id}/success`;
    recentDraws.add(newDraw, drawPath, dateScheduled);
    Router.push(`/${urlSlug}/[id]/success`, drawPath);
  } catch (error) {
    logApiError(error, analyticsType);
    setAPIError(true);
    setLoadingRequest(false);
  }
};

export const fetchDraw = async ({ urlSlug, drawId }) => {
  const draw = await apiRead({ urlSlug, drawId });
  return getValuesFromDraw({ urlSlug, draw });
};