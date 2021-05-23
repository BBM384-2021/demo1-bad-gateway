// Components
import Login from "../../components/auth/Login";
import {ForgotPassword, SetPassword} from "../../components/auth";
import PasswordReset from "../../components/auth/PasswordReset";
import SignUp from "../../components/auth/SignUp";
import HomePage from "../../components/common/HomePage";
import SubClubInfo from "../../components/subClub/SubClubInfo";
import NewClubInfo from "../../components/club/NewClubInfo";
import AnswerQuestions from "../../components/questionnarrie/AnswerQuestions";
import AddCategory from '../../components/club/AddCategory';



const routes = [
    {
        component: Login,
        path: '/login',
        title: 'Login',
    },
    {
        component: SetPassword,
        path: '/forgot-password/:token',
        title: 'Token Check',
    },
    {
        component: SignUp,
        path: '/signup',
        title: 'SignUp',
        menu: false,
        permission: [],
    },
    {
        component: ForgotPassword,
        path: '/forgot-password',
        title: 'Forgot Password',
    },
    {
        component: PasswordReset,
        path: '/password-reset',
        title: 'Password Reset',
    },
    {
        component: SubClubInfo,
        path: '/sub_club/info/:id',
        title: 'Sub-Club Info',
    },
    {
        component: NewClubInfo,
        path: '/club/info/:id',
        title: 'Club Info',
    },
    {
        component: HomePage,
        path: '/',
        title: 'Home Page'
    },
    {
        component: AnswerQuestions,
        path: '/questionnarie/answer/:id',
        title: 'Answer Questionnarie',
    },

];

export default routes;