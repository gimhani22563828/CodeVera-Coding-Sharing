import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  VStack,
  Divider,
  Link,
} from "@chakra-ui/react";
import { FiSettings, FiPlus } from "react-icons/fi";

const HomeRight = () => {
  const { user } = useSelector((store) => store);

  // Sample data - replace with your actual data source
  const trendingTopics = [
    { tag: "WebDevelopment", posts: "125K" },
    { tag: "UXDesign", posts: "89K" },
    { tag: "TechNews", posts: "72K" },
    { tag: "Programming", posts: "156K" },
    { tag: "DigitalArt", posts: "64K" },
  ];

  const suggestedUsers = [
    { name: "Jane Cooper", username: "janecodes", mutuals: 3 },
    { name: "Alex Morgan", username: "alexdev", mutuals: 5 },
    { name: "Sam Wilson", username: "samdesigns", mutuals: 2 },
  ];

  return (
    <Box width="300px" position="fixed" right="4" top="20" p={4}>
      {/* User Profile */}
      <Flex align="center" mb={6}>
        <Avatar
          size="md"
          src={user.reqUser?.image}
          name={user.reqUser?.username}
          mr={3}
        />
        <Box flex="1">
          <Text fontWeight="bold">{user.reqUser?.username}</Text>
          <Text fontSize="sm" color="gray.500">
            {user.reqUser?.name}
          </Text>
        </Box>
        <Button variant="link" color="blue.500" size="sm">
          Switch
        </Button>
      </Flex>

      {/* Trending Section */}
      <Box bg="gray.50" borderRadius="lg" p={4} mb={6}>
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontWeight="semibold">Trending Today</Text>
          <FiSettings size={18} color="#718096" />
        </Flex>

        <VStack spacing={3} align="stretch">
          {trendingTopics.map((topic, index) => (
            <Box key={index}>
              <Text fontWeight="medium">#{topic.tag}</Text>
              <Text fontSize="sm" color="gray.500">
                {topic.posts} posts
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Suggested Users */}
      <Box mb={6}>
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontWeight="semibold">Suggested For You</Text>
          <Button variant="link" fontSize="sm">
            See All
          </Button>
        </Flex>

        <VStack spacing={4}>
          {suggestedUsers.map((user, index) => (
            <Flex key={index} align="center" w="full">
              <Avatar size="sm" src="" name={user.name} mr={3} />
              <Box flex="1">
                <Text fontWeight="medium">{user.username}</Text>
                <Text fontSize="sm" color="gray.500">
                  {user.mutuals} mutual connections
                </Text>
              </Box>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<FiPlus size={14} />}
              >
                Follow
              </Button>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* Footer Links */}
      <Divider mb={3} />
      <Flex wrap="wrap" gap={2} fontSize="xs" color="gray.500">
        {["About", "Help", "Terms", "Privacy", "© 2025 CodeVera"].map(
          (item) => (
            <Link key={item} href="#" _hover={{ color: "gray.700" }}>
              {item}
            </Link>
          )
        )}
      </Flex>
    </Box>
  );
};

export default HomeRight;
