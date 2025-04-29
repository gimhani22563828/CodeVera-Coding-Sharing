import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import {
  IoReorderThreeOutline,
  IoHomeOutline,
  IoHome,
  IoSearchOutline,
  IoSearch,
  IoAddCircleOutline,
  IoAddCircle,
  IoFilmOutline,
  IoFilm,
  IoNotificationsOutline,
  IoNotifications,
  IoPersonOutline,
  IoPerson,
  IoBookOutline,
  IoBook,
  IoBarChartOutline,
  IoBarChart,
  IoExitOutline,
  IoInformationCircleOutline,
  IoInformationCircle,
} from "react-icons/io5";
import { RiCompassDiscoverLine, RiCompassDiscoverFill } from "react-icons/ri";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";
import SearchComponent from "../SearchComponent/SearchComponent";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);

  const menuItems = [
    {
      title: "Home",
      icon: <IoHomeOutline className="text-2xl" />,
      activeIcon: <IoHome className="text-2xl" />,
    },
    {
      title: "Search",
      icon: <IoSearchOutline className="text-2xl" />,
      activeIcon: <IoSearch className="text-2xl" />,
    },
    {
      title: "Explore",
      icon: <RiCompassDiscoverLine className="text-2xl" />,
      activeIcon: <RiCompassDiscoverFill className="text-2xl" />,
    },
    {
      title: "Reels",
      icon: <IoFilmOutline className="text-2xl" />,
      activeIcon: <IoFilm className="text-2xl" />,
    },
    {
      title: "Notifications",
      icon: <IoNotificationsOutline className="text-2xl" />,
      activeIcon: <IoNotifications className="text-2xl" />,
    },
    {
      title: "Create Post",
      icon: <IoAddCircleOutline className="text-2xl" />,
      activeIcon: <IoAddCircle className="text-2xl" />,
    },
    {
      title: "Create Reels",
      icon: <BsPlusSquare className="text-2xl" />,
      activeIcon: <BsPlusSquareFill className="text-2xl" />,
    },
    {
      title: "Create Story",
      icon: <IoAddCircleOutline className="text-2xl" />,
      activeIcon: <IoAddCircle className="text-2xl" />,
    },
    {
      title: "Profile",
      icon: <IoPersonOutline className="text-2xl" />,
      activeIcon: <IoPerson className="text-2xl" />,
    },
    {
      title: "About Us",
      icon: <IoInformationCircleOutline className="text-2xl" />,
      activeIcon: <IoInformationCircle className="text-2xl" />,
    },
    {
      title: "Learning Plan",
      icon: <IoBookOutline className="text-2xl" />,
      activeIcon: <IoBook className="text-2xl" />,
    },
    {
      title: "Learning Progress",
      icon: <IoBarChartOutline className="text-2xl" />,
      activeIcon: <IoBarChart className="text-2xl" />,
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Profile":
        navigate(`/${user.reqUser?.username}`);
        break;
      case "Home":
        navigate("/");
        break;
      case "Create Post":
        onOpen();
        break;
      case "About Us":
        navigate("/about");
        break;
      case "Reels":
        navigate("/reels");
        break;
      case "Create Reels":
        handleOpenCreateReelModal();
        break;
      case "Notifications":
        navigate("/notifications");
        break;
      case "Create Story":
        navigate("/create-story");
        break;
      case "Learning Plan":
        navigate("/learning_plan");
        break;
      case "Learning Progress":
        navigate("/learning-progress");
        break;
      case "Search":
        setIsSearchBoxVisible(true);
        return;
      default:
        break;
    }
    setIsSearchBoxVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCloseCreateReelModal = () => {
    setIsCreateReelModalOpen(false);
  };

  const handleOpenCreateReelModal = () => {
    setIsCreateReelModalOpen(true);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-20 md:w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transition-all duration-300 hover:w-64 group">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            CV
          </div>
          <span className="hidden md:block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            CodeVera
          </span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex flex-col justify-between h-[calc(100vh-5rem)] py-4 overflow-y-auto">
        <div className="space-y-2 px-2">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => handleTabClick(item.title)}
              className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                activeTab === item.title
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 text-blue-600 dark:text-purple-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6">
                {activeTab === item.title ? item.activeIcon : item.icon}
              </div>
              <span className="ml-4 hidden md:block font-medium">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Menu */}
        <div className="px-2">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                showDropdown
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              } text-gray-700 dark:text-gray-300`}
            >
              <IoReorderThreeOutline className="text-2xl" />
              <span className="ml-4 hidden md:block font-medium">More</span>
            </button>

            {showDropdown && (
              <div className="absolute bottom-full mb-2 left-0 right-0 mx-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <IoExitOutline className="text-xl mr-3" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Component */}
      {isSearchBoxVisible && (
        <div className="absolute top-0 left-full ml-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 h-screen">
          <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
        </div>
      )}

      {/* Modals */}
      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      <CreateReelModal
        onClose={handleCloseCreateReelModal}
        isOpen={isCreateReelModalOpen}
        onOpen={handleOpenCreateReelModal}
      />
    </div>
  );
};

export default Sidebar;
