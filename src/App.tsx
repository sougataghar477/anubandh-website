import './App.css';
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from 'react-toastify';
import { router } from './utils/routerConfig';
function App() {
  
  return (
    <>
    <ToastContainer />
    <RouterProvider router={router} />
    </>
  )
}

export default App
