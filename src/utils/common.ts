import _ from 'lodash';
import format from 'date-fns/format';
import { DEPLOYMENT_TEMPLATE } from 'src/constants/deployment';
import { LOCAL_STORAGE_KEY } from 'src/constants/common';
import { storage } from './standardizedData';

export const formatQuery = (query: any) => {
  const formatted = {};

  _.forEach(query, (v, k) => {
    formatted[k] = v;
  });
  return formatted;
};

/**
 * description: This function is used to convert string date to date type
 * @param {string} str - description
 */
export const convertStringDDMMYYYYToDate = (str: string) => {
  return format(
    new Date(str.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')),
    'dd/MM/yyyy',
  );
};

/**
 * description: This function is used to Change time format
 * @param {any} t - description: Time
 * @param {string} f - description: format
 * @returns {string} description: 
*/

export const convertTime = (t: any, f: string): string => {
  if (!t) return null;
  return format(new Date(t), f);
}

/**
 * description: This function is used to get the config of request
 * @param {any} t - description: Time
 * @param {string} f - description: format
 * @return {object} - description
*/

export const getRequestConfigurations = (): any => {
  return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${storage(LOCAL_STORAGE_KEY.ACCESS_TOKEN_APP)}` }
}

/**
 * description: 
 * @param {number} time - description: miliseconds
 * @returns {promise} - description: 
 */
export const delay = (time: any): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * description
 * @param {string} architecture - description
 * @param {string} software - description
 * @param {string} version - description
 * @param {string} deviceIds - description
 * @param {string} deviceId - description: optional
 * @return deploymentTemplate
 */
export const setContentDeployment = (architecture: string, software: string, version: string, deviceIds: [], deviceId?: string) => {
  /**
  * description: set deployment object: id, modules, targetCondition, priority
  */
  let deployment = DEPLOYMENT_TEMPLATE;
  let moduleConfig: any = {};

  deployment.id = software && version ? `${software}-${version.replaceAll('.', '_')}-${new Date().getTime()}` : `reset-to-factory-${new Date().getTime()}`

  //setting default module 
  deployment.content.modulesContent.$edgeAgent["properties.desired"]["modules"]["command-executor"]["settings"]["image"] = `lssdbu.azurecr.io/command-executor:0.0.4-${architecture}`;
  deployment.content.modulesContent.$edgeAgent["properties.desired"]["modules"]["command-executor"]["version"] = `0.0.4-${architecture}`

  //add selected module 
  if (software && version) {
    moduleConfig = {
      "version": version,
      "type": "docker",
      "status": "running",
      "restartPolicy": "always",
      "settings": {
        "image": `lssdbu.azurecr.io/${software}:${version}`,
        "createOptions": "{}"
      }
    }
  
    deployment.content.modulesContent.$edgeAgent["properties.desired"]["modules"][software] = { ...moduleConfig };
  }

  // set targetCondition
  if (deviceId) {
    deployment.targetCondition = `deviceId='${deviceId}'`;
  } else {
    deployment.targetCondition = deviceIds.map((e: string) => `deviceId='${e}'`).toString().replace(',', ' OR ');
  }

  return deployment;
}