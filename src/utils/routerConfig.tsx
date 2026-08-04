import { createBrowserRouter } from "react-router-dom";
import { LeadsRoot } from "../pages/leads";
import AllLeadsPage from "../pages/leads/all";
import NewLeadPage from "../pages/leads/new";
import RootLayout from "../components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { 
        path: "leads-all", 
        Component: LeadsRoot, 
        children: [
          {
            index: true,
            Component: AllLeadsPage,
          },
          {
            path: "new",
            Component: NewLeadPage,
          },
        ],
      },
    ],
  },
]);