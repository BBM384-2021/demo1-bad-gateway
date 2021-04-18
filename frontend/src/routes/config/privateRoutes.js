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
import ClubInfo from "../../components/club/ClubInfo";


const roleMapping = [
    {
        component: Profile,
        path: '/user/profile',
        title: 'Profile',
        menu: false,
    },
    {
        component: Users,
        path: '/user/list',
        title: 'Users',
        menu: true,
        menuIcon: "user",
        menuOrderPoint: 1000,
        permission: [
            Roles.ADMIN.key,
        ],
    },
    {
        component: UserInfo,
        path: '/user/info/:id',
        title: 'User Info',
        menu: false,
        permission: [
            Roles.ADMIN.key,

        ],
    },
    {
        component: EditUser,
        path: '/user/update/:userId',
        title: 'Update User Info',
        menu: false,
        permission: [
            Roles.ADMIN.key,
        ],
    },
    {
        component: CreateUser,
        path: '/user/create/',
        title: 'Create User',
        menu: false,
        permission: [
            Roles.ADMIN.key,
        ],
    },
    {
        component: PasswordReset,
        path: '/auth/password-reset',
        title: 'Reset Password',
        menu: false,
        permission: [],
    },
    {
        component: ChangePassword,
        path: '/user/change-password',
        title: 'Change Password',
        menu: false,
        menuIcon: "password",
        permission: [],
    },
    {
        component: ClubInfo,
        path: '/club/info/:id',
        title: 'Club Info',
        menu: false,
        permission: [
            Roles.ADMIN.key,
            Roles.SUB_CLUB_ADMIN.key,
            Roles.MEMBER.key
        ],
    },
];

export default roleMapping;