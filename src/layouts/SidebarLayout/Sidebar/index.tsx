import { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { SidebarContext } from 'src/contexts/SidebarContext';
import Logo from 'src/components/Logo';

import { Box, CSSObject, Drawer, Hidden, Theme } from '@mui/material';

import { styled } from '@mui/material/styles';
import SidebarMenu from './SidebarMenu';
import { selectors as selectorApp } from '../../../store/app';
import { useSelector } from 'react-redux';

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.sidebar.width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawers = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, $open }: { theme?: Theme, $open: boolean }) => ({
    width: theme.sidebar.width,
    color: theme.sidebar.textColor,
    background: theme.sidebar.background,
    boxShadow: theme.sidebar.boxShadow,
    height: '100%',
    position: 'fixed',
    zIndex: 10,
    // borderTopRightRadius: theme.general.borderRadius,
    // borderBottomRightRadius: theme.general.borderRadius,
    ...($open && {
      ...openedMixin(theme),
    }),
    ...(!$open && {
      ...closedMixin(theme),
    }),
  }),
);

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            position: fixed;
            z-index: 10;
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 60px;
        align-items: center;
        margin: 5px ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const isOpenSidebar: boolean = useSelector(selectorApp.sideBarSelector);

  return (
    <>
      <Hidden lgDown>
        <Drawers $open={isOpenSidebar}>
        {/* <SidebarWrapper> */}
          <Scrollbars autoHide>
            <TopSection>
              <Logo />
            </TopSection>
            <SidebarMenu />
          </Scrollbars>
          {/* </SidebarWrapper> */}
        </Drawers>
      </Hidden>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggle}
          onClose={closeSidebar}
          variant="temporary"
          elevation={9}
        >
          <SidebarWrapper>
            <Scrollbars autoHide>
              <TopSection>
                <Logo />
              </TopSection>
              <SidebarMenu />
            </Scrollbars>
          </SidebarWrapper>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Sidebar;
