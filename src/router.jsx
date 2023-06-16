import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import QuizLayout from './layouts/QuizLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
    },
    {
        path: '/quiz-game',
        element: <QuizLayout />,
    },
]);

export default router;
