import { ActionDialog } from "./actionDialog";

export interface AlertDialogModel {
    type: string;
    title: string;
    isShowCloseBtn?: boolean; 
    body: string;
    actions: {
      items: ActionDialog[];
    }
}
