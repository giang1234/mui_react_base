// import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { withTranslation } from 'react-i18next';
import { Box, Button, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { LANGS } from 'src/constants/common';

function Setting(props: any) {
  const { onClose, selectedValue, open, t, i18n } = props;
  const [lang, setLang] = useState(i18n.language);
  const listLanguage = LANGS;

  const handleClose = () => {
      onClose(selectedValue);
  };
 
  const onSave = () => {
    i18n.changeLanguage(lang);
    // onClose(selectedValue);
  }
  
  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };
  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={handleClose} open={open}>
      <DialogTitle>{t('common.setting')}</DialogTitle>

      <DialogContent sx={{paddingTop: 10}}>
        <Box >
          <FormControl fullWidth >
            <InputLabel htmlFor="grouped-select" id="demo-simple-select-label">{t('common.lang')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label={t('common.lang')}
              onChange={handleChange}
            >
              {
                listLanguage.map(lang => {
                  return <MenuItem key={lang.value} value={lang.value}>{t(lang.name)}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('action.cancel')}</Button>
        <Button onClick={onSave} autoFocus>{t('action.save')}</Button>
      </DialogActions>
    </Dialog>
  );
}

Setting.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withTranslation()(Setting);
