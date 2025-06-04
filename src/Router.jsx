import { createBrowserRouter, Navigate } from "react-router-dom";
import TabLayout from "./components/Tab/TabLayout";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Archive from "./pages/Archive";
import Schedule from "./pages/Schedule";
import Setting from "./pages/Setting";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chatting from "./pages/Chatting";

// Protected Route wrapper component
const ProtectedRoute = ({ children, redirectPath }) => {
  const isLoggedInNow = !!localStorage.getItem("accessToken");
  if (!isLoggedInNow) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

// Public Route wrapper component (redirects to home if logged in)
const PublicRoute = ({ children }) => {
  const isLoggedInNow = !!localStorage.getItem("accessToken");
  if (isLoggedInNow) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ProtectedRoute redirectPath="/get-started">
          <TabLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "question",
          element: <Question />,
        },
        {
          path: "archive",
          element: <Archive />,
        },
        {
          path: "schedule",
          element: <Schedule />,
        },
        {
          path: "settings",
          element: <Setting />,
        },
      ],
    },
    {
      path: "/chatting",
      element: (
        <ProtectedRoute redirectPath="/get-started">
          <Chatting />
        </ProtectedRoute>
      ),
    },
    {
      path: "/get-started",
      element: (
        <PublicRoute>
          <GetStarted />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
  ],
  {
    // This will scroll to top on navigation
    future: {
      v7_startTransition: true,
    },
    // This will handle scroll restoration
    scrollRestoration: "manual",
  }
);

export default router;
