import { forwardRef, FC } from 'react';
import 
{ Modal } from '@mui/material';
interface iRecipeProps {
    roles: any[],
    ref: any,
    visibled: any,
    handleClose: any,
}
const MainContent:FC<iRecipeProps> = forwardRef(({
    roles,
    visibled,
    handleClose
},ref): JSX.Element => {
    console.log(roles);
    return (
        <div>
            <Modal open={visibled} onClose={handleClose}>
                <div>giagph</div>
            </Modal>
        </div>
    )
});

export default MainContent;