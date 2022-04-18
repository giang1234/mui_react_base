/**
 * description: This file defines the common constants used in the application 
 * CONFIG_APP, LANGS, STATE_APP
 * TYPE_LOCAL_STORAGE, RESTART_POLICY
 * DEVICE_STATUS_MESSAGE, REQUEST_MESSAGE
 * KEY_DEPLOY_STATUS, VIEW_DELOY_STATUS
 * LOCAL_STORAGE_KEY
 */

export const CONFIG_APP = {
    PUBLIC_URL: process.env.REACT_APP_API_ROOT_URL,
    API_URL: process.env.REACT_APP_API_BASE_URL,
    CURRENT_STATE_APP: process.env.REACT_APP_STATE,
    GRAFANA_URL: process.env.REACT_APP_GRAFANA_API_URL,
    ORG_ID: process.env.REACT_APP_GRAFANA_API_ORG_ID,
    RESOURCE: process.env.REACT_APP_GRAFANA_API_VAR_RESOURCE,
    PANNEL_ID: process.env.REACT_APP_GRAFANA_API_PANNEL_ID,
    CONNECTION_STRING_TO_IOTHUB: process.env.REACT_APP_CONNECTION_STRING,
    SUBCRIPTION_ID: process.env.REACT_APP_SUBCRIPTION_ID
};

export const LANGS = [
    {
        value: 'vi',
        name: 'common.vietnamese'
    },
    {
        value: 'en',
        name: 'common.english'
    }
];

export const STATE_APP = {
    MAINTAIN: 'maintain',
    RUNNING: 'running',
};

export const TYPE_LOCAL_STORAGE = {
    URL_REDIRECT: 'url-redirect',
};

export const RESTART_POLICY = [
    {
        value: "never",
        name: "Never"
    },
    {
        value: "failure",
        name: "On-failure"
    },
    {
        value: "unhealthy",
        name: "On-unhealthy"
    },
    {
        value: "always",
        name: "Always"
    }
];

export const DEVICE_STATUS_MESSAGE = {
    200: '200 - OK',
    400: '400 - The deployment configuration is malformed or invalid.',
    417: '417 - The device doesn\'t have a deployment configuration set',
    412: '412 - The schema version in the deployment configuration is invalid.',
    406: '406 - The IoT Edge device is offline or not sending status reports.',
    500: '500 - An error occurred in the IoT Edge runtime.'
};

export const REQUEST_MESSAGE = {
    'ExpiredAuthenticationToken': 'Your working session expired, please login again',
    'InvalidAuthenticationToken': 'Your working session invalid, please login again',
    'TooManyDevicesError': 'Your usage quota exceeded the allocated quota. Please select another Hub by clicking your account name at top-left of the screen, otherwise contact Panasonic for support'
};

export const KEY_DEPLOY_STATUS = {
    WAITING: "waiting",
    PROGRESS: "progress",
    SUCCESS: "success",
    FAILED: "failed"
};

export const VIEW_DELOY_STATUS = {
    WAITING: {
        key: "waiting",
        label: "Waiting",
        color: 'default'
    },
    PROGRESS: {
        key: "progress",
        label: "In Progress",
        color: 'info'
    },
    SUCCESS: {
        key: "success",
        label: "Success",
        color: 'success'
    },
    FAILED: {
        key: "failed",
        label: "FAILED",
        color: 'error'
    },
};

export const LOCAL_STORAGE_KEY = {
    APP_THEME: 'appTheme',
    ACCESS_TOKEN_APP: 'accessToken',
    ACCESS_TOKEN_REGISTRY: 'accessTokenRegistry',
    ACCOUNT_INFO: 'info',
    CURRENT_HUB: 'currentHub',
    HUB_INFO: 'hubInfo',
    HUB_KEY_NAME: 'keyName',
    HUB_PRIMARY_KEY: 'primaryKey',
    DEVICE_DATA: 'deviceData',
    MODULE_DATA: 'moduleData'
}