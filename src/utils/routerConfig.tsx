import { createBrowserRouter } from "react-router";
import { LeadsRoot } from "../pages/leads";
import AllLeadsPage from "../pages/leads/all";
import NewLeadPage from "../pages/leads/new";
import RootLayout from "../components/RootLayout";
import LeadDetailsPage from "../pages/leads/details";
import AuthLayout from "../auth/AuthLayout";
import ProtectedLayout from "../auth/ProtectedLayout";
import DashboardPage from "../pages/dashboard";
import LoginPage from "../pages/login";





export const router = createBrowserRouter([
  {
    Component: AuthLayout,       // Wraps everything in AuthProvider
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        Component: ProtectedLayout, // Requires authentication
        children: [
          {
            index: true,
            Component: DashboardPage,
          },
          {
            path: "/",
            Component: RootLayout,
            children: [
              {
                path: "leads",
                Component: LeadsRoot,
                children: [
                  { path: "all", Component: AllLeadsPage },
                  { path: "new", Component: NewLeadPage },
                  { path: ":leadId", Component: LeadDetailsPage },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);