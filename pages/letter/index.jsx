import React from 'react';
import RandomLetterPageContainer from '../../components/Pages/RandomLetter/RandomLetterPageContainer.jsx';

const LettersQuickCreatePage = props => <RandomLetterPageContainer {...props} />;

LettersQuickCreatePage.getInitialProps = () => ({
  namespacesRequired: ['DrawLetter', 'CommonCreateDraw', 'Common'],
});

export default LettersQuickCreatePage;
