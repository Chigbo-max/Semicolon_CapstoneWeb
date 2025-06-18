import './App.css'
import {RouterProvider} from 'react-router-dom'
import router from "./routes/router.jsx";
import {Toaster} from 'sonner';

function App() {

  return (
    <>

    <Toaster richColors position="top-center" />
    <RouterProvider router={router}/>
     
    </>
  )
}

export default App
