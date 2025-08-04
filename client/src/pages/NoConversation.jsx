import React from "react";
import { useSelector } from "react-redux";

const NoConversation = () => {
  const authUser = useSelector((state) => state.user.authUser);

  return (
    <div className="flex flex-col justify-center items-center h-full  ">
      <h1 className="text-3xl font-bold text-white">
        Hii , {authUser.username}
      </h1>
      <h3 className="text-lg text-white">Start a Baat-Chit</h3>
    </div>
  );
};

export default NoConversation;
