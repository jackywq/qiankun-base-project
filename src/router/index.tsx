import type { ReactElement } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Profile from "../views/Profile";

const AUTH_STORAGE_KEY = "qiankun-base-token";

const RequireAuth = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const isAuthenticated = Boolean(
    window.localStorage.getItem(AUTH_STORAGE_KEY),
  );

  if (isAuthenticated) {
    return children;
  }

  return (
    <Navigate
      to="/login"
      replace
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
};

export default () => {
  const isAuthenticated = Boolean(
    window.localStorage.getItem(AUTH_STORAGE_KEY),
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/vue/*"
        element={
          <RequireAuth>
            <div id="vue" />
          </RequireAuth>
        }
      />
      <Route
        path="/react/*"
        element={
          <RequireAuth>
            <div id="react" />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
