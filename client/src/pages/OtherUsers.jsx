import React from "react";
import OtherUser from "./OtherUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import UseGetOtherUsers from "@/hooks/UseGetOtherUsers.jsx";


const OtherUsers = ({ users }) => {
  UseGetOtherUsers();

  return (
    <ScrollArea className="h-[400px]">
      <div className="flex flex-col mr-2 cursor-pointer w-full">
        {users ? (
          users.map((user) => <OtherUser key={user._id} user={user} />)
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </ScrollArea>
  );
};

export default OtherUsers;
