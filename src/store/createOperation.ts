import _ from 'lodash';
import { toast } from 'react-toastify';
import i18n from 'src/assets/locales/i18n';
import slice from './app/slice';
import { AlertDialogModel } from '../models/alertDialog'
import { REQUEST_MESSAGE } from 'src/constants/common';
import NProgress from 'nprogress';

const { setAlertStausSuc } = slice.actions

const fn = ({ actions, process = (p: any) => { }, ...options }) => {
  return (payload: any) => async (dispatch: any, getState: any, objDeps: any) => {
    const execute = async () => {
      const { startAction, successAction, failedAction } = actions;
      NProgress.start();
      NProgress.configure({showSpinner: false, speed: 800})
      if (_.isFunction(startAction)) {
        dispatch(startAction(payload));
      }
      try {
        const result: any = await process({ payload, dispatch, getState });
        if(result !== undefined) {
          NProgress.done();
        }
        
        if (_.isFunction(successAction)) {
          dispatch(successAction({ result, params: payload }));
        }

        let onSuccess: string = null;
        if (options && options.onSuccess) {
          ({ onSuccess } = options);
        }

        if (_.isFunction(onSuccess)) {
          onSuccess({ dispatch, getState, params: payload, result, ...objDeps });
        }
        
        if (options?.successMessage) {
          toast.success(i18n.t(`message.success.${options?.successMessage}`));
        }

        if (result?.status && result?.status === 200) {
          toast.success(result?.payload?.message);
        }

        if ((result?.cacheDta && result?.cacheDta?.name === "TooManyDevicesError") || result?.name === "TooManyDevicesError") {
          let setAlert: AlertDialogModel = {
            type: 'TooManyDevicesError',
            title: "Warning",
            body: REQUEST_MESSAGE['TooManyDevicesError'],
            actions: {
              items: [
                {
                  label: "OK",
                  event: {
                    type: "close",
                    url: "/login"
                  },
                }
              ]
            },
          }
          dispatch(setAlertStausSuc(setAlert))
        }
        
        return result;
      } catch (error) {
        NProgress.done();
        if (_.isFunction(failedAction)) {
          dispatch(failedAction({ error }));
        }
        //Show custom error
        if (options && options.onError) {
          toast.error(i18n.t(`message.error.${options?.errorMessage}`));
          return;
        }
        
        if(error.code === "InvalidAuthenticationToken" || error.code === "ExpiredAuthenticationToken") {
          let setAlert: AlertDialogModel = {
            type: '401-alert',
            title: "Warning",
            body: REQUEST_MESSAGE[error.code] || "An unknown error, please login again",
            isShowCloseBtn: false,
            actions: {
              items: [
                {
                  label: "Logout",
                  event: {
                    type: "logout",
                    url: "/login"
                  },
                }
              ]
            },
          }
          dispatch(setAlertStausSuc(setAlert));
          return;
        }


        if(error.request?.status === 401) {
          let setAlert: AlertDialogModel = {
            type: '401-alert',
            title: "Warning",
            body: "You are not authorized to use this function, please contact Panasonic for support",
            isShowCloseBtn: false,
            actions: {
              items: [
                {
                  label: "Ok",
                  event: {
                    type: "close",
                    url: "/device"
                  },
                }
              ]
            },
          }
          dispatch(setAlertStausSuc(setAlert));
          return;
        }

        // show error message from api response
        if (error.response?.data?.message) {
          toast.error(i18n.t(`${error.response?.data?.message}`));
          return;
        }

        if (error.response?.statusMessage) {
          toast.error(error.response?.statusMessage);
          return;
        }
        // show error by status
        if (error.message === 'Network Error') {
          return null;
        }
        if (error.request?.status) {
          toast.error(i18n.t(`message.error.err${error.request.status}`));
          return;
        }
        return null;
      }
    };

    if (options.requireConfirm) {
      // return Alert.alert(options.confirmTitle || 'Xác nhận', options.confirmMessage || '', [
      //   { text: 'Đồng ý', onPress: () => execute(), style: 'default' },
      //   { text: 'Huỷ', onPress: () => {}, style: 'cancel' },
      // ]);
    }

    return execute();
  };
};

export default fn;
