import React, { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";

const ProfilePostsPart = ({ user }) => {
  const [activeTab, setActiveTab] = useState("POST");
  const { post } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const tabs = [
    {
      tab: "POST",
      icon: <AiOutlineTable className="text-xl" />,
      activeIcon: <AiOutlineTable className="text-xl text-black" />,
    },
    {
      tab: "REELS",
      icon: <RiVideoLine className="text-xl" />,
      activeIcon: <RiVideoFill className="text-xl text-black" />,
    },
    {
      tab: "SAVED",
      icon: <BsBookmark className="text-xl" />,
      activeIcon: <BsBookmarkFill className="text-xl text-black" />,
    },
    {
      tab: "TAGGED",
      icon: <BiUser className="text-xl" />,
      activeIcon: <BiUser className="text-xl text-black" />,
    },
  ];

  useEffect(() => {
    const data = {
      jwt: token,
      userId: user?.id,
    };
    dispatch(reqUserPostAction(data));
  }, [user, post.createdPost]);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex justify-center border-t border-gray-200">
        <div className="flex space-x-16">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center py-4 px-1 relative ${
                item.tab === activeTab ? "text-black" : "text-gray-500"
              }`}
            >
              <div className="flex items-center space-x-2">
                {item.tab === activeTab ? item.activeIcon : item.icon}
                <span className="text-base font-medium">{item.tab}</span>
              </div>
              {item.tab === activeTab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        {activeTab === "POST" && post.reqUserPost?.length > 0 ? (
          post.reqUserPost?.map((item, index) => (
            <ReqUserPostCard post={item} key={index} />
          ))
        ) : activeTab === "SAVED" && user?.savedPost?.length > 0 ? (
          user?.savedPost?.map((item, index) => (
            <ReqUserPostCard post={item} key={index} />
          ))
        ) : (
          <div className="col-span-3 flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center mb-4">
              {activeTab === "POST" && <AiOutlineTable className="text-3xl" />}
              {activeTab === "REELS" && <RiVideoLine className="text-3xl" />}
              {activeTab === "SAVED" && <BsBookmark className="text-3xl" />}
              {activeTab === "TAGGED" && <BiUser className="text-3xl" />}
            </div>
            <h2 className="text-3xl font-light mb-2">
              {activeTab === "POST" && "No Posts Yet"}
              {activeTab === "REELS" && "No Reels Yet"}
              {activeTab === "SAVED" && "No Saved Posts"}
              {activeTab === "TAGGED" && "No Tagged Posts"}
            </h2>
            <p className="text-sm text-gray-500 max-w-md text-center">
              {activeTab === "POST" &&
                "When you share photos and videos, they'll appear on your profile."}
              {activeTab === "REELS" &&
                "When you create reels, they'll appear here."}
              {activeTab === "SAVED" &&
                "Save photos and videos that you want to see again."}
              {activeTab === "TAGGED" &&
                "Photos and videos of you will appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePostsPart;
