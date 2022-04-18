export interface Device {
    id: string;
    deviceId: string;
    status: string;
    groupName: string;
    moduleInfo: string;
    etag?: string;
    tags?: {
        groupName?: string,
        supportedAction?: string,
        processor?: string,
        supportedActionModuleIdentiy?: string,
    }
}
