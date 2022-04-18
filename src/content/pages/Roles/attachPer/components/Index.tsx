import { useEffect, useRef } from 'react';
import MainContent from './Contents';
import { useLocation } from 'react-router-dom';
const Main = ({
    permissions,
    init
}: any) => {
    let location = useLocation();
    const ref = useRef();
    const thePath = location.pathname;
    const roleId = thePath.substring(thePath.lastIndexOf('/') + 1);
    const roleKey = Object.keys(permissions);
    useEffect(() => {
        init(roleId);
    }, []);
    return (
        <>
            <MainContent
                permissions={permissions}
                ref={ref}
                roleKey={roleKey}
            />
        </>
    )
};

export default Main;