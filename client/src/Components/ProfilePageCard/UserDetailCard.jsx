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
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-28 w-28 md:h-36 md:w-36 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                src={
                  user?.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={user?.username}
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 w-full space-y-4">
            {/* Username and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-2xl font-semibold">{user?.username}</h2>

              <div className="flex items-center gap-3 flex-wrap">
                {isRequser ? (
                  <button
                    onClick={goToAccountEdit}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <FiEdit size={16} />
                    <span>Edit Profile</span>
                  </button>
                ) : isFollow ? (
                  <button
                    onClick={handleUnFollowUser}
                    className="bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Follow
                  </button>
                )}

                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  <FiMessageSquare size={16} />
                  <span>{isRequser ? "Tools" : "Message"}</span>
                </button>

                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <TbCircleDashed size={20} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-base">
              <div className="flex flex-col items-center md:items-start">
                <span className="font-semibold">
                  {post?.reqUserPost?.length || 0}
                </span>
                <span className="text-gray-600 text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-semibold">{user?.follower?.length}</span>
                <span className="text-gray-600 text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-semibold">{user?.following?.length}</span>
                <span className="text-gray-600 text-sm">Following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <p className="font-semibold text-base">{user?.name}</p>
              <p className="text-gray-800 text-sm">{user?.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
