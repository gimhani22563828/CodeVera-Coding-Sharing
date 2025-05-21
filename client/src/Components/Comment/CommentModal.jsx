import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { timeDifference } from "../../Config/Logic";
import { createComment, getAllComments } from "../../Redux/Comment/Action";
import { findPostByIdAction } from "../../Redux/Post/Action";
import CommentCard from "./CommentCard";
import EmojiPicker from "emoji-picker-react";

const CommentModal = ({
  isOpen,
  onClose,
  handleLikePost,
  handleUnLikePost,
  handleSavePost,
  handleUnSavePost,
  isPostLiked,
  isSaved,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const { post, comments, user } = useSelector((store) => store);
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    if (postId) {
      dispatch(findPostByIdAction({ jwt, postId }));
      dispatch(getAllComments({ jwt, postId }));
    }
  }, [postId, comments?.createdComment, comments?.deletedComment]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddComment = () => {
    const data = {
      jwt,
      postId,
      data: {
        content: commentContent,
      },
    };
    dispatch(createComment(data));
    setCommentContent("");
  };

  const handleEmojiClick = (emojiData) => {
    setCommentContent((prev) => prev + emojiData.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal size={"lg"} onClose={handleClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <div className="flex flex-col h-[75vh]">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center">
                <img
                  className="w-9 h-9 rounded-full object-cover mr-3"
                  src={
                    post.singlePost?.user?.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="Profile"
                />
                <div>
                  <p className="font-semibold">
                    {post?.singlePost?.user?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    @{post?.singlePost?.user?.username}
                  </p>
                </div>
              </div>
              <BsThreeDots className="text-gray-500 cursor-pointer" />
            </div>

            {/* Comments Container */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Post Caption */}
              {post.singlePost?.caption && (
                <div className="mb-6 flex">
                  <img
                    className="w-9 h-9 rounded-full object-cover mr-3"
                    src={
                      post.singlePost?.user?.image ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="Profile"
                  />
                  <div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <span className="font-semibold mr-2">
                        {post?.singlePost?.user?.username}
                      </span>
                      <span>{post?.singlePost?.caption}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-2">
                      {timeDifference(post?.singlePost?.createdAt)}
                    </div>
                  </div>
                </div>
              )}

              {/* Comments List */}
              {comments.comments?.length > 0 ? (
                comments.comments?.map((item) => (
                  <CommentCard key={item.id} comment={item} />
                ))
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No comments yet
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4 sticky bottom-0 bg-white">
              {/* Action Buttons */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex space-x-4">
                  {isPostLiked ? (
                    <button
                      onClick={handleUnLikePost}
                      className="flex items-center text-blue-500"
                    >
                      <AiFillLike className="text-2xl" />
                      <span className="ml-1">Unlike</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleLikePost}
                      className="flex items-center"
                    >
                      <AiOutlineLike className="text-2xl" />
                      <span className="ml-1">Like</span>
                    </button>
                  )}
                  <button className="flex items-center">
                    <FaRegComment className="text-xl" />
                    <span className="ml-1">Comment</span>
                  </button>
                  <button className="flex items-center">
                    <RiSendPlaneLine className="text-xl" />
                    <span className="ml-1">Share</span>
                  </button>
                </div>
                {isSaved ? (
                  <button
                    onClick={() => handleUnSavePost(post.singlePost?.id)}
                    className="flex items-center"
                  >
                    <BsBookmarkFill className="text-xl" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSavePost(post.singlePost?.id)}
                    className="flex items-center"
                  >
                    <BsBookmark className="text-xl" />
                  </button>
                )}
              </div>

              {/* Likes Count */}
              {post.singlePost?.likedByUsers?.length > 0 && (
                <p className="text-sm font-semibold mb-2">
                  {post.singlePost?.likedByUsers?.length} likes
                </p>
              )}

              {/* Timestamp */}
              <p className="text-xs text-gray-500 mb-3">
                {timeDifference(post?.singlePost?.createdAt)}
              </p>

              {/* Comment Input with Emoji Picker */}
              <div className="relative">
                <div className="flex items-center">
                  <button
                    onClick={toggleEmojiPicker}
                    className="mr-3 text-xl text-gray-500"
                  >
                    <BsEmojiSmile />
                  </button>
                  <input
                    className="flex-1 border border-gray-200 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Add a comment..."
                    type="text"
                    onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                    onChange={(e) => setCommentContent(e.target.value)}
                    value={commentContent}
                  />
                </div>

                {showEmojiPicker && (
                  <div
                    ref={emojiPickerRef}
                    className="absolute bottom-12 left-0 z-20"
                  >
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      width={300}
                      height={350}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
