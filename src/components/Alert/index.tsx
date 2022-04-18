import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { withTranslation } from 'react-i18next';
import { actions as actionApp } from '../../store/app';
import { actions as actionAuth } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from 'src/constants/auth.config';
interface confirmProps {
    title: string;
    content: string;
    open: any;
    handleClose?: any;
    t?: any;
    isShowCloseBtn?: boolean;
    alertSetting: any
}

function AlertDialog(props: confirmProps) {  
    const msalInstance = new PublicClientApplication(msalConfig);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { alertSetting, title, isShowCloseBtn = true, content, open, t } = props;
    const handleClose = () => {
        dispatch(actionApp.resetAlertDialog())
    }

    const handleAlertEvent = (event: any) => {
        switch (event.type) {
            case "redirect":
                dispatch(actionApp.resetAlertDialog());
                navigate(event.url, { replace: true });
                break;
            case "loginAgain":
                Promise.all([dispatch(actionApp.resetAlertDialog()), dispatch(actionAuth.logout({}))])
                break;
            case "logout":
                if (sessionStorage.length) {
                    msalInstance.logoutRedirect({ postLogoutRedirectUri: "/auth" });
                } else {
                    Promise.all([dispatch(actionApp.resetAlertDialog()), dispatch(actionAuth.logout({}))])
                }
                // msalInstance.logoutRedirect({ postLogoutRedirectUri: "/auth" });
                break;
            case "close":
                dispatch(actionApp.resetAlertDialog());
                break;
            default:
                break;
        }
    }
    return (
        <>
            <Dialog open={open} aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {!isShowCloseBtn && <Button onClick={handleClose}>{t('action.cancel')}</Button>}
                    {
                        alertSetting.actions ? alertSetting.actions.items.map((item: any, index:number): JSX.Element => {
                            return <Button key={`${item.type}${index}`} onClick={() => handleAlertEvent(item.event)}>{item.label}</Button>
                        }) : null
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default withTranslation()(AlertDialog);
