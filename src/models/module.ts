export interface Module {
    id: string;
    deviceId: string;
    moduleId: string;
    status: string;
    etag?: string;
    tags?: {
        customTags?: [],
        supportedAction?: []
    }
}
