import React from "react";
import MessageContent from "./MessageContent";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.user.selectedUser);

  const handleDisplayUser = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={() => handleDisplayUser(user)}
        className={`flex gap-2 items-center hover:bg-gray-400 py-3 px-2 border-b border-slate-400 rounded-sm rounded-b-none ${
          selectedUser?._id === user?._id ? "bg-gray-400" : ""
        }`}
      >
        <div className="">
          <img
            src={user?.profilePhoto}
            alt="user-profile"
            className=" w-10 rounded-full"
            loading="lazy"
          />
        </div>
        <div className="flex items-center">
          <p className="text-md font-semibold text-white">{user?.fullName}</p>
        </div>
      </div>
    </>
  );
};

export default OtherUser;
