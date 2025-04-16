import React from "react";
import Message from "./Message.jsx";
import UseGetMessages from "@/hooks/UseGetMessages.jsx";
import { useSelector } from "react-redux";
import NoConversation from "./NoConversation.jsx";

const Messages = () => {
  UseGetMessages();

  const messages = useSelector((state) => state.message.messages);

  return (
    <div className="flex-1 px-4 overflow-auto">
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <Message key={message?._id} message={message} />
        ))
      ) : (
        <NoConversation />
      )}
    </div>
  );
};

export default Messages;
