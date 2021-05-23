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
import NewClubInfo from "../../components/club/NewClubInfo";
import CreateClub from "../../components/club/CreateClub";
import UpdateClub from "../../components/club/UpdateClub";
import SubClubChat from "../../components/chat/SubClubChat";
import PrivateMessage from "../../components/privateMessage/PrivateMessage";
import Events from "../../components/event/Events";
import EventInfo from "../../components/event/EventInfo";
import CreateEvent from "../../components/event/CreateEvent";
import UpdateEvent from "../../components/event/UpdateEvent";
import SubClubs from '../../components/subClub/SubClubs';
import SubClubInfo from '../../components/subClub/SubClubInfo';
import CreateSubClub from '../../components/subClub/CreateSubClub';
import UpdateSubClub from '../../components/subClub/UpdateSubClub';
import AddCategory from '../../components/club/AddCategory';
import CreateClubRequest from '../../components/clubRequest/CreateClubRequest';
import ClubRequestList from '../../components/clubRequest/ClubRequestList';


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
    // {
    //     component: ClubInfo,
    //     path: '/club/info/:id',
    //     title: 'Club Info',
    //     permission: [],
    // },
    {
        component: NewClubInfo,
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
    {
        component: SubClubChat,
        path: '/chat/:id',
        title: 'Chat',
        permission: [],
    },
    {
        component: PrivateMessage,
        path: '/private_message',
        title: 'Private Messages',
        permission: [],
    },
    {
        component: Events,
        path: '/event/list',
        title: 'Events',
        permission: [],
    },
    {
        component: EventInfo,
        path: '/event/info/:id',
        title: 'Event Detail',
        permission: [],
    },
    {
        component: CreateEvent,
        path: '/event/create/',
        title: 'Create Event',
        permission: [Roles.ADMIN.key],
    },
    {
        component: UpdateEvent,
        path: '/event/update/:id',
        title: 'Create Event',
        permission: [Roles.ADMIN.key],
     },
  {
        component: SubClubs,
        path: '/sub_club/list',
        title: 'SubClubs',
        permission: [],
    },
    {
        component: SubClubInfo,
        path: '/sub_club/info/:id',
        title: 'Sub-Club Info',
        permission: [],
    },
    {
        component: CreateSubClub,
        path: '/sub_club/create',
        title: 'Sub-Club Create',
        permission: [Roles.ADMIN.key,],
    },
    {
        component: UpdateSubClub,
        path: '/sub_club/update/:id',
        title: 'Sub-Club Update',
        permission: [Roles.ADMIN.key,Roles.SUB_CLUB_ADMIN],
    },
    {
        component: AddCategory,
        path: '/add_category',
        title: 'Add Category',
        permission: [Roles.ADMIN.key,],
    },
    {
        component: CreateClubRequest,
        path: '/club_request/create',
        title: 'Create Club Request',
        permission: [Roles.MEMBER.key],
    },
    {
        component: ClubRequestList,
        path: '/club_request/list',
        title: 'Club Request List',
        permission: [Roles.ADMIN.key],
    }



];

export default roleMapping;