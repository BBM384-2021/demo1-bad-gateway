import {default as Roles} from "./roles";

// Components
import {
    Profile,
    Users,
    UserInfo,
    EditUser,
} from "../../components/user";


import CreateUser from "../../components/user/CreateUser";
import PasswordReset from "../../components/auth/PasswordReset";
import ChangePassword from "../../components/auth/ChangePassword";

import Clubs from '../../components/club/Clubs';
import SignUp from "../../components/auth/SignUp";
import ClubInfo from "../../components/club/ClubInfo";
import CreateClub from "../../components/club/CreateClub";
import UpdateClub from "../../components/club/UpdateClub";

const roleMapping = [
    {
        component: Profile,
        path: '/user/profile',
        title: 'Profile',
    },
    {
        component: Users,
        path: '/user/list',
        title: 'Users',
        permission: [],
    },
    {
        component: UserInfo,
        path: '/user/info/:id',
        title: 'User Info',
        permission: [],
    },
    {
        component: EditUser,
        path: '/user/update/:userId',
        title: 'Update User Info',
        permission: [
            Roles.ADMIN.key,
        ],
    },
    {
        component: CreateUser,
        path: '/user/create/',
        title: 'Create User',
        permission: [
            Roles.ADMIN.key,
        ],
    },
    {
        component: PasswordReset,
        path: '/auth/password-reset',
        title: 'Reset Password',
        permission: [],
    },
    {
        component: ChangePassword,
        path: '/user/change-password',
        title: 'Change Password',
        permission: [],
    },
    {
        component: Clubs,
        path: '/club/list',
        title: 'Clubs',
        permission: [],
    },
    {
        component: ClubInfo,
        path: '/club/info/:id',
        title: 'Club Info',
        permission: [],
    },
    {
        component: CreateClub,
        path: '/club/create',
        title: 'Create Club',
        permission: [Roles.ADMIN.key]
    },
    {
        component: UpdateClub,
        path: '/club/update/:id',
        title: 'Update Club',
        permission: [Roles.ADMIN.key]
    },
];

export default roleMapping;