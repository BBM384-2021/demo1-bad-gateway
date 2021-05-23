// Components
import Login from "../../components/auth/Login";
import {ForgotPassword, SetPassword} from "../../components/auth";
import PasswordReset from "../../components/auth/PasswordReset";
import SignUp from "../../components/auth/SignUp";
<<<<<<< HEAD
import AnswerQuestions from "../../components/questionnarrie/AnswerQuestions";
=======
import AddCategory from '../../components/club/AddCategory';
>>>>>>> 8e22b3e056a0a981a055b7f048a0a28194b3fbe3


const routes = [
    {
        component: Login,
        path: '/login',
        title: 'Giriş',
    },
    {
        component: SetPassword,
        path: '/forgot-password/:token',
        title: 'Token Kontrolü',
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
        title: 'Şifremi Unuttum',
    },
    {
        component: PasswordReset,
        path: '/password-reset',
        title: 'Şifre Sıfırlama',
    },
<<<<<<< HEAD
    {
        component: AnswerQuestions,
        path: '/questionnarie/answer/:id',
        title: 'Answer Questionnarie',
    },
=======
  
>>>>>>> 8e22b3e056a0a981a055b7f048a0a28194b3fbe3
];

export default routes;