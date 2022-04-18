import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { CONFIG_APP } from "src/constants/common";
// import { observer } from "mobx-react-lite";
// import { useGuardStore } from "./hooks";
import {selectors as selectorAuth} from '../store/auth';

export const GuardAuth = ({ children, settings }): JSX.Element => {
    //check authen, author
    // if not authen => login page
    // if not author => 404 page
    const isLoggedIn = useSelector(selectorAuth.userSelector);
    const isAuthor = null;
    const location = useLocation();
    
    let redricet: JSX.Element = <Navigate to="/404" replace state={{ path: location.pathname }} />

    if (CONFIG_APP.CURRENT_STATE_APP === 'maintain') {
        redricet = <Navigate to={settings.maintenance.defaultRoute} replace state={{ path: location.pathname }} />  
    }
    else {
        if (isLoggedIn) {
            redricet =  children
            // redricet = author == 'a' ? children : <Navigate to={settings.unauthorization.defaultRoute} replace state={{ path: location.pathname }} />
        }
        else {
            redricet = <Navigate to="/login" replace state={{ path: location.pathname }} />
        }
    }
    return redricet;
}