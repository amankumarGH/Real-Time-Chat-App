import React from "react";
import SendInput from "./SendInput.jsx";
import Messages from "./Messages.jsx";
import { useSelector } from "react-redux";
import NoConversation from "./NoConversation.jsx";

const MessageContent = () => {
  const userData = useSelector((state) => state.user.selectedUser);

  return (
    <div className="w-full flex flex-col h-[550px]">
      {userData ? (
        <>
          <div className="flex gap-2 items-center bg-zinc-400 py-3 px-4 border-b rounded border-slate-400">
            <div>
              <img
                src={userData.profilePhoto}
                alt="user"
                className=" w-10 rounded-full"
              />
            </div>
            <div className="flex items-center">
              <p className="text-md font-semibold text-white">
                {userData.fullName}
              </p>
            </div>
          </div>
          <Messages />
          <SendInput />
        </>
      ) : (
        <NoConversation />
      )}
    </div>
  );
};

export default MessageContent;
