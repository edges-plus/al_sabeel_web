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
   {
    path: "/Settings",
    component: lazy(() => import("@pages/Settings")),
    exact: true,
    private: true,
  },
   {
    path: "/Settings/Ledger/view",
    component: lazy(() => import("@pages/Account/Ledger/LedgerTree")),
    exact: true,
    private: true,
  },
   {
    path: "/Settings/LedgerGroup",
    component: lazy(() => import("@pages/Account/LedgerGroup")),
    exact: true,
    private: true,
  },
   {
    path: "/Settings/Ledger",
    component: lazy(() => import("@pages/Account/Ledger")),
    exact: true,
    private: true,
  },
    {
    path: "/Settings/CurrencyManagement",
    component: lazy(() => import("@pages/Settings/CurrencyManagement")),
    exact: true,
    private: true,
  },
];
