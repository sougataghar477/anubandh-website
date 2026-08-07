import { createBrowserRouter } from "react-router";
import { LeadsRoot } from "../pages/leads";
import AllLeadsPage from "../pages/leads/all";
import NewLeadPage from "../pages/leads/new";
import RootLayout from "../pages/RootLayout";
import AuthLayout from "../auth/AuthLayout";
import ProtectedLayout from "../auth/ProtectedLayout";
import DashboardPage from "../pages/dashboard";
import LoginPage from "../pages/login";
import ProductsPage from "../pages/products";
import CreateUser from "../pages/users/create";
import UserLayout from "../pages/users/UsersLayout";
import AllUsers from "../pages/users";
import UserDetailsPage from "../pages/users/details";
import AdminRoute from "../pages/admin/AdminLayout";
import LeadDetailsPage from "../pages/leads/details";
import UserProfileLayout from "../pages/profile/UserProfileLayout";
import UserProfileTest from "../pages/profile";





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
            path: "profile",
            Component:UserProfileLayout,
            children:[
              {
                index:true,
                Component:UserProfileTest
              }
            ]
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