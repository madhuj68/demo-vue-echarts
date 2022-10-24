import { createRouter, createWebHashHistory } from 'vue-router';
import LineDraggable from '../components/LineDraggable';
import CustomProfile from '../components/CustomProfile';

const routes = [
        {
                path: '/line-draggable',
                name: 'LineDraggable',
                component: LineDraggable,
        },
        {
                path: '/custom-profile',
                name: 'CustomProfile',
                component: CustomProfile,
        }
]

const router = createRouter({
        history: createWebHashHistory(),
        routes,
})

export default router;