import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({ img }) => {
  const [show, setShow] = useState(false);
  const authUser = useSelector((state) => state.user.authUser);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="rounded cursor-pointer">{img}</div>

      {show && (
        <div className="flex flex-col absolute top-full mt-1 bg-white border rounded shadow w-40 z-50">
          <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            {authUser?.fullName}
          </Link>
          {/* <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            {authUser?.}
          </Link>
          <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Option 3
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default Profile;
