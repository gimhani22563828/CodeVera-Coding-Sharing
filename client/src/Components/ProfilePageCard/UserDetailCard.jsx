import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { FiEdit, FiMessageSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAction, unFollowUserAction } from "../../Redux/User/Action";

const UserDetailCard = ({ user, isRequser, isFollowing }) => {
  const token = localStorage.getItem("token");
  const { post } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollow, setIsFollow] = useState(false);

  const goToAccountEdit = () => {
    navigate("/account/edit");
  };

  const data = {
    jwt: token,
    userId: user?.id,
  };

  const handleFollowUser = () => {
    dispatch(followUserAction(data));
    setIsFollow(true);
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(data));
    setIsFollow(false);
  };

  useEffect(() => {
    setIsFollow(isFollowing);
  }, [isFollowing]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image */}
        <div className="relative">
          <img
            className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-2 border-gray-200"
            src={
              user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt={user?.username}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full">
          {/* Username and Actions */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">{user?.username}</h2>

            <div className="flex items-center gap-3">
              {isRequser ? (
                <button
                  onClick={goToAccountEdit}
                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-md text-sm font-medium transition"
                >
                  <FiEdit size={14} />
                  Edit Profile
                </button>
              ) : isFollow ? (
                <button
                  onClick={handleUnFollowUser}
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-md text-sm font-medium transition"
                >
                  Following
                </button>
              ) : (
                <button
                  onClick={handleFollowUser}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                >
                  Follow
                </button>
              )}

              <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-md text-sm font-medium transition">
                <FiMessageSquare size={14} />
                {isRequser ? "Tools" : "Message"}
              </button>

              <button className="p-2 rounded-full hover:bg-gray-100">
                <TbCircleDashed size={18} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-4 text-sm">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-semibold">
                {post?.reqUserPost?.length || 0}
              </span>
              <span className="text-gray-600">Posts</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-semibold">{user?.follower?.length}</span>
              <span className="text-gray-600">Followers</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="font-semibold">{user?.following?.length}</span>
              <span className="text-gray-600">Following</span>
            </div>
          </div>

          {/* Bio */}
          <div className="text-sm">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-gray-800">{user?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
