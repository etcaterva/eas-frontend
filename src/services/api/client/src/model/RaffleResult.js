/**
 * EAS API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';
import RaffleResultValue from './RaffleResultValue';





/**
* The RaffleResult model module.
* @module model/RaffleResult
* @version v1
*/
export default class RaffleResult {
    /**
    * Constructs a new <code>RaffleResult</code>.
    * @alias module:model/RaffleResult
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>RaffleResult</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RaffleResult} obj Optional instance to populate.
    * @return {module:model/RaffleResult} The populated <code>RaffleResult</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RaffleResult();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('created_at')) {
                obj['created_at'] = ApiClient.convertToType(data['created_at'], 'Date');
            }
            if (data.hasOwnProperty('schedule_date')) {
                obj['schedule_date'] = ApiClient.convertToType(data['schedule_date'], 'Date');
            }
            if (data.hasOwnProperty('value')) {
                obj['value'] = ApiClient.convertToType(data['value'], [RaffleResultValue]);
            }
        }
        return obj;
    }

    /**
    * @member {String} id
    */
    id = undefined;
    /**
    * @member {Date} created_at
    */
    created_at = undefined;
    /**
    * @member {Date} schedule_date
    */
    schedule_date = undefined;
    /**
    * @member {Array.<module:model/RaffleResultValue>} value
    */
    value = undefined;








}


