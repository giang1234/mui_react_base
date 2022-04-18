import { memo } from 'react';
import { Main } from './components/Loadable';
const User = memo(() => {
    return (
        <>
            <Main />
        </>
    )
})

export default User
