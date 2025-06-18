import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/Notfound";
import Dashboard from "../pages/Dashboard";
import Enrollment from "../pages/Enrollment";
import DeviceDetails from "../pages/DeviceDetails";
import TrustedContact from "../pages/TrustedContact";
import SecurityPage from "../pages/Security";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      }
    ],
  },    

      {
        path:"*",
        element: <NotFound/>,
      },

      {
        path:"/dashboard",
        element:<Dashboard/>,
      },

      {
        path: "/enrollment",
        element: <Enrollment/>,
      },
    
      {
        path: "deviceDetails/:deviceId",
        element: <DeviceDetails/>,
      },
      {
        path: "trustedContacts/:deviceId",
        element: <TrustedContact/>,
      },

      {
        path: "/security",
        element: <SecurityPage/>,
      }

  
]
)

export default router;
