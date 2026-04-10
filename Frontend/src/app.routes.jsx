import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/home";
import Interview from "./features/interview/pages/Interview";
import Privacy from "./features/Terms/Privacy";
import TermsOfService from "./features/Terms/TermsOfService";
import Help from "./features/Terms/Help";
import Docs from "./features/Terms/Docs";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    },
    {
        path: "/privacy",
        element: <Privacy />
    },
    {
        path: "/terms",
        element: <TermsOfService />
    },
    {
        path: "/help",
        element: <Help />
    },
    {
        path: "/docs",
        element: <Docs />
    }
]);

