import Button from '@mui/material/Button';
import { withTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
interface confirmProps {
  name?: string;
  key?: any;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  onClick?: any;
  icon?: JSX.Element;
  isDisable?: boolean;
  t?: any;
}

function ActionBtn(props: confirmProps) { 
  const {name, icon, isDisable, onClick, color = "primary", key = "00"} = props;
  const renderContent = (): JSX.Element => {
    if(icon) {
      return <IconButton aria-label={name} onClick={() => onClick()} color={color} disabled={isDisable} sx={{border: '1px solid #ddd', margin: "5px"}}>
        {icon}
      </IconButton>
    }else{
      return <Button variant="text" sx={{ height: "100%", border: '1px solid #ddd', margin: "5px"}} onClick={() => onClick()} disabled={isDisable} color={color}>
        {name}
      </Button>
    }
  }

  return (
    <>
      <Tooltip title={name} key={key} disableInteractive>
        <span style={isDisable ? { pointerEvents: "none" } : {}}>
          {renderContent()}
        </span>
      </Tooltip>
    </>
  )
}

export default withTranslation()(ActionBtn);
