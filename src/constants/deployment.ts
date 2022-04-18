export const DEPLOYMENT_TEMPLATE = {
    "id": null,
    "content": {
        "modulesContent": {
            "$edgeAgent": {
                "properties.desired": {
                    "schemaVersion": "1.1",
                    "runtime": {
                        "type": "docker",
                        "settings": {
                            "minDockerVersion": "v1.25",
                            "loggingOptions": "",
                            "registryCredentials": {
                                "lssdbu": {
                                    "username": process.env.REACT_APP_REGISTRY_USER_NAME,
                                    "password": process.env.REACT_APP_REGISTRY_PASSWORD,
                                    "address": process.env.REACT_APP_REGISTRY_LOGIN_SERVER
                                }
                            }
                        }
                    },
                    "systemModules": {
                        "edgeAgent": {
                            "settings": {
                                "image": "mcr.microsoft.com/azureiotedge-agent:1.1",
                                "createOptions": ""
                            },
                            "type": "docker"
                        },
                        "edgeHub": {
                            "settings": {
                                "image": "mcr.microsoft.com/azureiotedge-hub:1.1",
                                "createOptions": "{\"HostConfig\":{\"PortBindings\":{\"443/tcp\":[{\"HostPort\":\"443\"}],\"5671/tcp\":[{\"HostPort\":\"5671\"}],\"8883/tcp\":[{\"HostPort\":\"8883\"}]}}}"
                            },
                            "type": "docker",
                            "status": "running",
                            "restartPolicy": "always"
                        }
                    },
                    "modules": {
                        "command-executor": {
                            "settings": {
                                "image": "lssdbu.azurecr.io/command-executor:0.0.4-arm64v8",
                                "createOptions": "{}"
                            },
                            "type": "docker",
                            "version": "0.0.4-arm64v8",
                            "status": "running",
                            "restartPolicy": "always"
                        },
                        "IoTEdgeMetricsCollector": {
                            "settings": {
                                "image": "mcr.microsoft.com/azureiotedge-metrics-collector:1.0",
                                "createOptions": ""
                            },
                            "type": "docker",
                            "env": {
                                "ResourceId": {
                                    "value": "/subscriptions/31cb8a02-2d9b-4d30-8c2b-88a63c3a5994/resourceGroups/LS-SDBU/providers/Microsoft.Devices/IotHubs/raspberry-pi-ls-sdbu-1"
                                },
                                "UploadTarget": {
                                    "value": "AzureMonitor"
                                },
                                "LogAnalyticsWorkspaceId": {
                                    "value": "af2d0e86-5303-4b34-a54f-e5360b6dc56a"
                                },
                                "LogAnalyticsSharedKey": {
                                    "value": "PdljlGJkEE+EuO6lWd3VLspa8DUX+EEciU7K8CW+Pli/c4WQv7ZXREcqbeHHqWfwfhtB/0lzr02xMgqsmXKPKQ=="
                                },
                                "ScrapeFrequencyInSecs": {
                                    "value": "30"
                                }
                            },
                            "status": "running",
                            "restartPolicy": "always",
                            "version": "1.0"
                        }
                    }
                }
            },
            "$edgeHub": {
                "properties.desired": {
                    "schemaVersion": "1.1",
                    "routes": {
                        "FromMetricsCollectorToUpstream": "FROM /messages/modules/< FROM_MODULE_NAME >/* INTO $upstream"
                    },
                    "storeAndForwardConfiguration": {
                        "timeToLiveSecs": 7200
                    }
                }
            },
        }
    },
    'schemaVersion': '1.0',
    "targetCondition": "deviceId ='vm-iot-edge-1'",
    'priority': 10,
    'labels': {},
    "metrics": {
        "queries": {},
        "results": {}
    },
    "etag": ""
}