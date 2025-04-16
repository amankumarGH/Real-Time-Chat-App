import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setUser({ username: "", password: "" });
  };

  return (
    <div className="w-[80vw] sm:w-[50vw] lg:w-[30vw] flex mx-auto py-7">
      <div className="w-full p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-100">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mt-3">
            <label htmlFor="">Username</label>
            <Input
              placeholder="Enter Username"
              value={user.username}
              onChange={handleChange}
              name="username"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Password</label>
            <Input
              placeholder="Enter Password"
              onChange={handleChange}
              type="password"
              value={user.password}
              name="password"
            />
          </div>
          <Button
            type="submit"
            className="mt-3 bg-white text-black hover:bg-gray-200"
          >
            Login
          </Button>
        </form>
        <div className="mt-2 sm:font-semibold">
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"} className="underline">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
