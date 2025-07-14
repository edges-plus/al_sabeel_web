import React, { lazy, Suspense } from "react";
const LazyDashboard = lazy(() => import("@pages/Dashboard"));

const ReportsDashboard = () => (
  <Suspense fallback={null}>
    <LazyDashboard showLedgerDialog={true} />
  </Suspense>
);
export const routes = [
  {
    path: "/",
    component: lazy(() => import("@pages/Login")),
    exact: true,
    private: false,
  },
  {
    path: "/login",
    component: lazy(() => import("@pages/Login")),
    exact: true,
    private: false,
  },
//   {
//     path: "/forgotPassword",
//     component: lazy(() => import("@pages/ForgotPassword")),
//     exact: true,
//     private: false,
//   },
//   {
//     path: "/resetPassword",
//     component: lazy(() => import("@pages/ResetPassword")),
//     exact: true,
//     private: false,
//   },
  {
    path: "/dashboard",
    component: lazy(() => import("@pages/Dashboard")),
    exact: true,
    private: true,
  },
];
