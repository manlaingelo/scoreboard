import Matches from './views/Matches.vue';
import CreateMatch from './views/CreateMatch.vue';
import Login from './views/Login.vue';
import ScoreBoard from './views/ScoreBoard.vue';
import UpdateMatch from './views/UpdateMatch.vue';

export default[
    {
        path: '/',
        component: Matches,
        name: 'Matches'
    },
    {
        path: '/create',
        component: CreateMatch,
        name: 'CreateMatch',
       
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/score/:slug',
        name: 'ScoreBoard',
        component: ScoreBoard,
    },
    {
        path: '/update/:slug',
        name: 'UpdateMatch',
        component: UpdateMatch,
    }
];
