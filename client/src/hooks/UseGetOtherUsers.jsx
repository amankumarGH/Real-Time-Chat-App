import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUser } from "@/redux/userSlice";

const UseGetOtherUsers = () => {
  const dispatch = useDispatch();
  return useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true; //only to write when authentication is apply
        const res = await axios.get(`http://localhost:8080/api/v1/user/`);
        dispatch(setOtherUser(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};

export default UseGetOtherUsers;
