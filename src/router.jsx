import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import QuizLayout from './layouts/QuizLayout';
import InitialScreen from './components/InitialScreen';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
    },
    {
        path: '/quiz-game',
        element: <QuizLayout />,
    },
    {
        path: '/initial-screen',
        element: <InitialScreen />,
    },
]);

export default router;
