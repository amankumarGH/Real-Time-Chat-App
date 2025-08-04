// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleCheckBox = (gender) => {
    setUser({ ...user, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/signup`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <>
      <div className="w-[80vw] sm:w-[50vw] lg:w-[30vw] flex mx-auto py-7">
        <div className="w-full p-6 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-100">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <div className="flex flex-col gap-1 mt-3">
              <label className="text-base ">Fullname:</label>
              <Input
                value={user.fullName}
                name="fullName"
                onChange={handleChange}
                type="text"
                placeholder="Enter Fullname"
                className="rounded-md px-3 py-1 sm:py-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-base">Username:</label>
              <Input
                value={user.username}
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Enter Username"
                className="rounded-md px-3 py-1 sm:py-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-base">Password:</label>
              <Input
                value={user.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Enter Password"
                className="rounded-md px-3 py-1 sm:py-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-base">Confirm Password:</label>
              <Input
                type="password"
                value={user.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                className="rounded-md px-3 py-1 sm:py-2"
              />
            </div>
            {/* checkbox */}
            <div className="flex my-2">
              <div className="flex">
                <p>Male</p>
                <input
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckBox("male")}
                  // defaultChecked
                  className="mx-2"
                />
              </div>
              <div className="flex">
                <p>Female</p>
                <input
                  type="checkbox"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckBox("female")}
                  // defaultChecked
                  className="checkbox mx-2"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-white text-black hover:bg-gray-200"
            >
              Sign Up
            </Button>
          </form>
          <div className="mt-2 font-semibold">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="underline mx-1">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
