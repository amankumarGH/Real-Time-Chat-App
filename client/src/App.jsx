import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { Button } from "./components/ui/button";
import NoConversation from "./pages/NoConversation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HomePage />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/*",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <SignUp />
      </>
    ),
  },
]);

function App() {
  // const [socket, setSocket] = useState(null);
  // const authUser = useSelector((state) => state.user.authUser);

  // useEffect(() => {
  //   if (authUser) {
  //     const socket = io("http://localhost:8080", {
  //       query: {
  //         userId: authUser?._id,
  //       },
  //     });

  //     setSocket(socket);
  //   }
  // }, [authUser]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
