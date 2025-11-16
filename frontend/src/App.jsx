import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from "./components/home";
import SignUp from "./components/signup";
import SignIn from "./components/signIn";


function App() {


  let router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    
  },
  {
    path: "/signup",
    Component: SignUp,
    
  },
  {
    path: "/signin",
    Component: SignIn,
    
  },
  {
    path: "*",
    Component: Home,
    
  },
]);

  return (
     <RouterProvider router={router} />
  )
}

export default App
