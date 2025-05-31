import { createBrowserRouter, Navigate } from "react-router-dom";
import TabLayout from "./components/common/TabLayout";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Archive from "./pages/Archive";
import Schedule from "./pages/Schedule";
import Setting from "./pages/Setting";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Simulated login status (replace with actual auth logic later)
const isLoggedIn = true;

// Protected Route wrapper component
const ProtectedRoute = ({ children, redirectPath }) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

// Public Route wrapper component (redirects to home if logged in)
const PublicRoute = ({ children }) => {
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute redirectPath="/login">
        <TabLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/question",
        element: <Question />,
      },
      {
        path: "/archive",
        element: <Archive />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/settings",
        element: <Setting />,
      },
    ],
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
        <SignUp />
      </PublicRoute>
    ),
  },
]);

export default router;
