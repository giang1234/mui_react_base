import { useEffect, useRef, useState } from 'react';
import MainContent from './Contents';
const Main = ({...props}) => {
    const ref = useRef();
    const [visibled, setVisibled] = useState(false);
    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <>
            <MainContent
                roles={props.roles}
                ref={ref}
                visibled={visibled}
                handleClose={() => setVisibled(false)}
            />
        </>
    )
};

export default Main;