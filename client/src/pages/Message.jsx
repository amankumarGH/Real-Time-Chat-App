import { Button } from "@/components/ui/button";
import UseGetMessages from "@/hooks/UseGetMessages";
import { postDeleteMessage } from "@/hooks/postDeleteMessage";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const authUser = useSelector((state) => state.user.authUser);
  const selectedUser = useSelector((state) => state.user.selectedUser);

  const dateObj = new Date(message?.createdAt);
  const timeString = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true, // for AM/PM format
  });

  // const date = dateObj.toLocaleTimeString("en-US", {
  //   day: "2-digit",
  //   month: "long",
  //   year: "numeric",
  // });

  const handleDeleteMessage = (id) => {
    postDeleteMessage(id, dispatch);
  };

  return (
    <div
      ref={scroll}
      className={`chat ${
        message?.senderId === authUser?._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar avatar-online">
        <div className="w-6 rounded-full">
          <img
            alt="img"
            src={`${
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }`}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs font-medium text-white">{timeString}</time>
      </div>
      <div className="chat-bubble text-sm px-2 py-1 rounded-lg">
        {message?.message}
      </div>
      {/* <Button onClick={() => handleDeleteMessage(message?._id)}>delete</Button> */}
    </div>
  );
};

export default Message;
