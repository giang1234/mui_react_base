import loadable from '../../../../components/Loadable';

export const Main = loadable(
  () => import('./Containers')
);

// export const MainContent = loadable(
//   () => import('./mainContents')
// );
