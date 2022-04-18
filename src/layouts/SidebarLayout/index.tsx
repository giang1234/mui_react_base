import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';
import { GuardAuth } from 'src/router/guard';
import { RouteConfigs } from 'src/router/route.config';
import { selectors as selectorApp } from '../../store/app';
import { useSelector } from 'react-redux';
import Footer from 'src/components/Footer';
interface SidebarLayoutProps {
  children?: ReactNode;
}

const MainWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<any>(({ theme, open }) => ({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  paddingLeft: theme.sidebar.width,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    paddingLeft: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - ${theme.sidebar.width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const MainWrapper = styled(Box)(
//   ({ theme }) => `
//         flex: 1 1 auto;
//         display: flex;
//         height: 100%;

//         @media (min-width: ${theme.breakpoints.values.lg}px) {
//           padding-left: ${theme.sidebar.width};
//         }
// `
// );

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
        @media (min-width: 1280px) {
          max-width: unset;
      }
`
);

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const isOpenSidebar: boolean = useSelector(selectorApp.sideBarSelector);
  return (
    <>
      <GuardAuth settings={RouteConfigs}>
        <Sidebar />
        <MainWrapper open={!isOpenSidebar}>
          <Header />
          <MainContent>
            <Outlet />
          </MainContent>
          <Footer />
        </MainWrapper>

      </GuardAuth>
    </>
  );
};

export default SidebarLayout;
