import React, { useEffect, useState } from "react";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";

const ProfilePostsPart = ({ user }) => {
  const { post } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (user?.id) {
      const data = { jwt: token, userId: user.id };
      dispatch(reqUserPostAction(data));
    }
  }, [user, post.createdPost]);

  const posts = post.reqUserPost || [];

  // Filter posts that have a media (image/video)
  const photos = posts.filter((p) => p.media); // Change `media` to your actual image key

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      {/* "What's on your mind" box */}
      <div className="bg-white rounded-md shadow-sm p-4 mb-6">
        <p className="text-gray-500">What's on your mind, {user?.firstName}?</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-b border-gray-300 mb-4">
        <button
          className={`py-2 px-4 font-semibold ${
            activeTab === "posts"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            activeTab === "photos"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("photos")}
        >
          Photos
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "posts" && (
        <>
          {posts.length > 0 ? (
            posts.map((item, index) => (
              <div key={index} className="mb-4">
                <ReqUserPostCard post={item} user={user} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
                <span className="text-3xl font-light">📝</span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">No Posts Yet</h2>
              <p className="text-gray-500 max-w-sm">
                When {user?.firstName || "this user"} shares something, it will
                appear here.
              </p>
            </div>
          )}
        </>
      )}

      {activeTab === "photos" && (
        <div className="grid grid-cols-3 gap-2">
          {photos.length > 0 ? (
            photos.map((p, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={p.media} // Make sure `p.media` is correct for your post structure
                  alt="User post"
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))
          ) : (
            <div className="text-center col-span-3 py-16 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">No Photos Yet</h2>
              <p className="text-gray-500">
                When {user?.firstName || "this user"} uploads a photo, it will
                appear here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePostsPart;
