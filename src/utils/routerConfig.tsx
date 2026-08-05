import { createBrowserRouter } from "react-router";
import { LeadsRoot } from "../pages/leads";
import AllLeadsPage from "../pages/leads/all";
import NewLeadPage from "../pages/leads/new";
import RootLayout from "../pages/RootLayout";
import LeadDetailsPage from "../pages/leads/details";
import AuthLayout from "../auth/AuthLayout";
import ProtectedLayout from "../auth/ProtectedLayout";
import DashboardPage from "../pages/dashboard";
import LoginPage from "../pages/login";
import ProductsPage from "../pages/products";
import CreateUser from "../pages/users/create";
import UserLayout from "../pages/users/UsersLayout";
import AdminRoute from "../components/admin/AdminLayout";
import AllUsers from "../pages/users";
import UserDetailsPage from "../pages/users/details";





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
            path: "/",
            Component: RootLayout,
            children: [
          {
            index: true,
            Component: DashboardPage,
          },
          {
                path: "leads",
                Component: LeadsRoot,
                children: [
                  { index:true, Component: AllLeadsPage },
                  { path: "new", Component: NewLeadPage },
                  { path: ":leadId", Component: LeadDetailsPage },
                ],
          },
          {
                path:"products",
                Component:ProductsPage,
                index:true
          },
          {
                Component: AdminRoute,
                children: [
                  {
                    path: "users",
                    Component: UserLayout,
                    children:[
                      {
                        index:true,
                        Component:AllUsers
                      },
                      {
                        path:"new",
                        Component:CreateUser,
                      },
                      {
                        path:":userId",
                        Component:UserDetailsPage
                      }
                    ]
                  },
                ],
              }
            ],
          },
        ],
      },
    ],
  },
]);