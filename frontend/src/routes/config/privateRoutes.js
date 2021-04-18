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


const roleMapping = [
    {
        component: Profile,
        path: '/user/profile',
        title: 'Profil',
        menu: false,
    },
    {
        component: Users,
        path: '/user/list',
        title: 'Kullanıcılar',
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
        title: 'Kullanıcı Bilgileri',
        menu: false,
        permission: [
            Roles.ADMIN.key,
        ],
    },
    {
        component: EditUser,
        path: '/user/update/:userId',
        title: 'Kullanıcı Bilgilerini Güncelle',
        menu: false,
        permission: [
            Roles.ADMIN.key,
        ],
    },
    {
        component: CreateUser,
        path: '/user/create/',
        title: 'Kullanıcı Oluştur',
        menu: false,
        permission: [
            Roles.ADMIN.key,
        ],
    },
    {
        component: PasswordReset,
        path: '/auth/password-reset',
        title: 'Şifre Sıfırlama',
        menu: false,
        permission: [],
    },
    {
        component: ChangePassword,
        path: '/user/change-password',
        title: 'Şifre Değiştirme',
        menu: false,
        menuIcon: "password",
        permission: [],
    }
];

export default roleMapping;