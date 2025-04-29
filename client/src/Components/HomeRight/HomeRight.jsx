// HomeRight.jsx
import React from "react";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import SuggestionsUserCard from "./SuggestionsUserCard";

const HomeRight = ({ suggestedUser }) => {
  const { user } = useSelector((store) => store);
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={
              user.reqUser?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="profile"
          />
          <div className="ml-3">
            <p className="font-bold text-sm">{user.reqUser?.username}</p>
            <p className="text-xs opacity-60">{user.reqUser?.username}</p>
          </div>
        </div>
        <p className="text-blue-500 text-sm cursor-pointer">Switch</p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-gray-600">
          Suggestions for you
        </p>
        <p className="text-xs font-medium text-blue-500">View All</p>
      </div>

      <div className="space-y-4">
        {suggestedUser.map((item, index) => (
          <SuggestionsUserCard
            key={index}
            image={
              item.userImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            username={item.username}
            description={"Follows you"}
          />
        ))}
      </div>

      <div className="opacity-50 text-xs flex flex-wrap gap-1 mt-6">
        <span>About</span>
        <BsDot />
        <span>Help</span>
        <BsDot />
        <span>Privacy</span>
        <BsDot />
        <span>Terms</span>
        <BsDot />
        <span>Language</span>
        <BsDot />
        <span>Meta</span>
        <BsDot />
        <span>© 2025 CodeVera</span>
      </div>
    </div>
  );
};

export default HomeRight;
