// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import MessageContent from "./MessageContent";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Login from "./Login";

// const HomePage = () => {
//   const authUser = useSelector((state) => state.user.authUser);

//   return (
//     <>
//       {!authUser} ? (
//       <Login />) : (
//       <div className="flex justify-center py-7">
//         <div className="flex w-[80vw] sm:w-[70vw] lg:w-[45vw] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
//           <SideBar />
//           <MessageContent />
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;

import React from "react";
import SideBar from "./SideBar";
import MessageContent from "./MessageContent";
import { useSelector } from "react-redux";
import Login from "./Login";

const HomePage = () => {
  const authUser = useSelector((state) => state.user.authUser);

  return (
    <>
      {!authUser ? (
        <Login />
      ) : (
        <div className="flex justify-center py-7">
          <div className="flex w-[80vw] sm:w-[70vw] lg:w-[45vw] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <SideBar />
            <MessageContent />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
