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
    component: lazy(() => import("@pages/auth/Login")),
    exact: true,
    private: false,
  },
  {
    path: "/login",
    component: lazy(() => import("@pages/auth/Login")),
    exact: true,
    private: false,
  },
  {
    path: "/forgotPassword",
    component: lazy(() => import("@pages/auth/ForgotPassword")),
    exact: true,
    private: false,
  },
  {
    path: "/resetPassword",
    component: lazy(() => import("@pages/auth/ResetPassword")),
    exact: true,
    private: false,
  },
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
  {
    path: "/ExpenseVoucher",
    component: lazy(() => import("@pages/Account/ExpenseVouchers")),
    exact: true,
    private: true,
  },
  {
    path: "/ClosingEntries",
    component: lazy(() => import("@pages/Account/ClosingEntries")),
    exact: true,
    private: true,
  },
  {
    path: "/Payments",
    component: lazy(() => import("@pages/Account/Payments")),
    exact: true,
    private: true,
  },
  {
    path: "/Receipts",
    component: lazy(() => import("@pages/Account/Receipts")),
    exact: true,
    private: true,
  },
  {
    path: "/OtherPurchases",
    component: lazy(() => import("@pages/Account/OtherPurchases")),
    exact: true,
    private: true,
  },
  {
    path: "/OtherSale",
    component: lazy(() => import("@pages/Account/OtherSale")),
    exact: true,
    private: true,
  },
  {
    path: "/InternalFundTransfer",
    component: lazy(() => import("@pages/Account/InternalFundTransfer")),
    exact: true,
    private: true,
  },
  {
    path: "/Reconciliation",
    component: lazy(() => import("@pages/Account/Reconciliation")),
    exact: true,
    private: true,
  },
  {
    path: "/invoices",
    component: lazy(() => import("@pages/Account/Invoices")),
    exact: true,
    private: true,
  },
  {
    path: "/JournalEntries",
    component: lazy(() => import("@pages/Account/JournalEntries")),
    exact: true,
    private: true,
  },
  {
    path: "/JournalEntries/:id",
    component: lazy(() => import("@pages/Account/JournalEntries/JournalEntryDetail")),
    exact: true,
    private: true,
  },
  {
    path: "/BulkEntry",
    component: lazy(() => import("@pages/Account/BulkEntry")),
    exact: true,
    private: true,
  },
  {
    path: "/CRM",
    component: lazy(() => import("@pages/CRM")),
    exact: true,
    private: true,
  },
  {
    path: "/CRM/Customers",
    component: lazy(() => import("@pages/CRM/Customers")),
    exact: true,
    private: true,
  },
  {
    path: "/CRM/Customers/Add",
    component: lazy(() => import("@pages/CRM/Customers/AddEdit")),
    exact: true,
    private: true,
  },

   {
    path: "/CRM/Customer/Edit/:id",
    component: lazy(() => import("@pages/CRM/Customers/AddEdit")),
    exact: true,
    private: true,
  },

   {

    path: "/ServiceManagement",
    component: lazy(() => import("@pages/ServiceManagement")),
    exact: true,
    private: true,
  },
  {
    path: "/ServiceManagement/service-groups",
    component: lazy(() => import("@pages/ServiceManagement/ServiceGroups")),
    exact: true,
    private: true,
  },
  {
    path: "/ServiceManagement/services",
    component: lazy(() => import("@pages/ServiceManagement/Services")),
    exact: true,
    private: true,
  },
      {
    path: "/ServiceManagement/service/Add",
    component: lazy(() => import("@pages/ServiceManagement/Services/AddServices")),
    exact: true,
    private: true,
  },      {
    path: "/ServiceManagement/service/Edit/:id",
    component: lazy(() => import("@pages/ServiceManagement/Services/AddServices")),
    exact: true,
    private: true,
  },
       {
    path: "/AddWork",
    component: lazy(() => import("@pages/AddWork")),
    exact: true,
    private: true,
  },

  {
    path: "/ServiceManagement/tools-consumables",
    component: lazy(() => import("@pages/ServiceManagement/ToolsConsumables")),
    exact: true,
    private: true,
  },
  {
    path: "/ServiceManagement/purchases",
    component: lazy(() => import("@pages/ServiceManagement/Purchases")),
    exact: true,
    private: true,
  },
  {
    path: "/ServiceManagement/crews",
    component: lazy(() => import("@pages/ServiceManagement/Crews")),
    exact: true,
    private: true,
  },
  {
    path: "/ServiceManagement/crews/add",
    component: lazy(() => import("@pages/ServiceManagement/Crews/AddEdit")),
    exact: true,
    private: true,
  },
  {
    path: "/Settings/users/add",
    component: lazy(() => import("@pages/User/AddEdit")),
    exact: true,
    private: true,
  },
 


];
