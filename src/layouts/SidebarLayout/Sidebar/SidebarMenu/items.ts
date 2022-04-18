import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { ROLE_MENU } from 'src/constants/roleMenu';

export interface MenuItem {
  id: string
  parent: string;
  name: string;
  role: any[];
  items?: MenuItem[];
  link?: string;
  icon?: ReactNode;
  badge?: string;
}

export interface MenuItems {
  id: string,
  heading: string;
  role: any[]
  items: MenuItem[];
}

const menuItems: MenuItems[] = [
  {
    id: '0',
    heading: '',
    role: ["admin"],
    items: [
      {
        id: '0_1',
        parent: '0',
        name: 'overview',
        link: '/overview',
        icon: DesignServicesTwoToneIcon,
        role: ["admin"]
      }
    ],
  },
  {
    id: '1',
    heading: 'Management',
    role: ROLE_MENU.DEMO_APP.ROLE,
    items: [
      {
        id: '1_1',
        parent: '1',
        name: 'user_management',
        link: '/admin/user-management',
        icon: DesignServicesTwoToneIcon,
        role: ROLE_MENU.DEMO_APP.MENU_1.ROLE,
        items: [
          {
            id: '1_1_1',
            parent: '1_1',
            name: 'department',
            link: '/admin/department',
            icon: BrightnessLowTwoToneIcon,
            role: ROLE_MENU.DEMO_APP.MENU_1.PERMISSION.ROLE
          },
          {
            id: '1_1_2',
            parent: '1_1',
            name: 'user',
            link: '/admin/user',
            icon: ManageAccountsIcon,
            role: ROLE_MENU.DEMO_APP.PERMISSION.ROLE
          },
          {
            id: '1_1_3',
            parent: '1_1',
            name: 'permission',
            link: '/admin/permission',
            icon: BrightnessLowTwoToneIcon,
            role: ROLE_MENU.DEMO_APP.PERMISSION.ROLE
          },
          {
            id: '1_1_4',
            parent: '1_1',
            name: 'Role',
            link: '/admin/role',
            icon: AdminPanelSettingsOutlinedIcon,
            role: ROLE_MENU.DEMO_APP.PERMISSION.ROLE
          }
        ]
      },
      {
        id: '1_2',
        parent: '1',
        name: 'Training Management',
        link: '/admin/training-management',
        icon: ModelTrainingIcon,
        role: ROLE_MENU.DEMO_APP.ROLEMANAGER.ROLE
      }
    ],
  },
];

export default menuItems;
