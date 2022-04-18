import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { withTranslation } from 'react-i18next';
interface confirmProps {
  title: string;
  content: string;
  contentJsx?: React.ReactNode;
  open: any;
  handleClose: any;
  handleEvent?: any;
  actionName?: any;
  t: any;
}
function ModalConfirm(props: confirmProps) {
  const { title, content, contentJsx, open, handleClose, handleEvent, actionName, t } = props;

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
            {contentJsx}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t('action.cancel')}
          </Button>
          <Button onClick={handleEvent || handleClose}>{ actionName ? actionName : t('action.confirm')}</Button>
        </DialogActions>
      </Dialog>
  )
}

export default withTranslation()(ModalConfirm);
