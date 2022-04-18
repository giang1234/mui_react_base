import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { actions as actionApp, selectors as selectorApp } from '../../../store/app';
// import HeaderMenu from './Menu';
import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import Logo from 'src/components/Logo';

const HeaderWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<any>(({ theme, open }) => ({
  height: theme.header.height,
  color: theme.header.textColor,
  padding: theme.spacing(0, 2),
  right: 0,
  zIndex: 5,
  backgroundColor: theme.header.background,
  boxShadow: theme.header.boxShadow,
  position: 'fixed',
  left: theme.sidebar.width,
  justifyContent: 'space-between',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    left: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - ${theme.sidebar.width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const isOpenSidebar: boolean = useSelector(selectorApp.sideBarSelector);
  const dispatch = useDispatch();

  const collapseSideBar = () => {
    dispatch(actionApp.toggleCollapseSideBar());
  }
  return (
    <HeaderWrapper display="flex" alignItems="center" open={!isOpenSidebar}>
      <Box display="flex" alignItems="center">
        <Hidden lgUp>
          <Logo />
        </Hidden>
        <Hidden lgDown>
          <IconButton color="primary" onClick={collapseSideBar}>
            <MenuTwoToneIcon />
          </IconButton>
        </Hidden>

        {/* <Hidden mdDown>
          <HeaderMenu />
        </Hidden> */}
      </Box>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <HeaderUserbox />
        <Hidden lgUp>
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Hidden>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
