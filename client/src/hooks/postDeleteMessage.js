import { setMessages } from "@/redux/messageSlice";
import axios from "axios";

export const postDeleteMessage = async (id, dispatch) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.delete(
      `http://localhost:8080/api/v1/message/${id}`
    );
    console.log(res);
    dispatch(setMessages(res.data));
  } catch (error) {
    console.log(error);
  }
};
