import { Suspense, lazy } from "react";
import FallbackLoading from "./components/FallBackLoading";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Dashboard from "./components/Dashboard";

const MenuCategories = lazy(()=>import("./pages/dashboard/menu-categories"))
const MenuItems = lazy(()=>import("./pages/dashboard/menu-items"))
const Settings = lazy(() => import("./pages/dashboard/settings"));
export default () => {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="menu-categories"
          element={
            <ProtectedRoute>
              <MenuCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="menu-items"
          element={
            <ProtectedRoute>
              <MenuItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};
