import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import OtherUser from "./OtherUser";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteUser } from "@/redux/userSlice";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { setDeleteMessage } from "@/redux/messageSlice";
import { persistor } from "@/redux/store";
import { IoIosLogOut } from "react-icons/io";
import Profile from "./Profile";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.user.otherUsers) || [];

  const authUser = useSelector((state) => state.user.authUser);

  const [searchData, setSearchData] = useState("");

  const filteredUsers = allUsers.filter((user) =>
    user.fullName.toLowerCase().includes(searchData.toLowerCase())
  );

  const handleSearch = () => {
    setSearchData("");
  };

  const handleLogOut = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      toast.success(res.data.message);
      dispatch(setDeleteUser());
      dispatch(setDeleteMessage());
      persistor.purge();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const img = (
    <img
      src={authUser?.profilePhoto}
      alt={authUser?.username}
      className="w-10"
    />
  );

  return (
    <div className="border-r border-slate-500 px-5 py-4 flex flex-col w-[70%] sm:w-[70%]">
      <div className="mr-2 text-black  bg-gray-400 flex items-center justify-between p-2 rounded-md">
        <div>
          <Profile img={img} />
        </div>
        <IoIosLogOut
          title="Logout"
          className=" text-4xl hover:text-white rounded-md cursor-pointer"
          onClick={handleLogOut}
        />
      </div>
      <form
        action=""
        className="relative flex items-center border-b border-slate-400 py-4 mr-2 w-[100%]"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchData}
          name="searchData"
          onChange={(e) => setSearchData(e.target.value)}
          className="w-full mr-2 py-2 pr-8 rounded-lg px-3 outline-none placeholder:text-white bg-gray-400 placeholder:font-semibold"
        />
        {searchData ? (
          <RxCross2
            className="absolute inset-y-2.8 end-5 text-xl cursor-pointer"
            onClick={handleSearch}
          />
        ) : (
          []
        )}
      </form>
      <OtherUsers users={filteredUsers} />
    </div>
  );
};

export default SideBar;
