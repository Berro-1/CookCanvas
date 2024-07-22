import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
