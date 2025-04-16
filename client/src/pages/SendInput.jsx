import { setMessages } from "@/redux/messageSlice";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const messages = useSelector((state) => state.message.messages);

  const currInput = useRef(null);
  useEffect(() => {
    currInput.current.focus();
  }, [selectedUser]);

  useEffect(() => {
    setMessage("");
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit} autoComplete="off">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message..."
          value={message}
          name="message"
          ref={currInput}
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg w-full p-3 border-zinc-500 bg-gray-400 font-semibold placeholder:text-white"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4 text-white"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
