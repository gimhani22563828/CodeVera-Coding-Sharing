import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createStory } from "../../Redux/Story/Action";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Spinner,
  useToast,
  Image,
  Icon,
  Textarea,
  AspectRatio,
} from "@chakra-ui/react";
import { FiUpload, FiImage, FiCheck } from "react-icons/fi";

const CreateStory = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleFilePick = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!selectedFile) {
        toast({
          title: "Please select an image",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      const imageUrl = await uploadToCloudinary(selectedFile);

      if (!imageUrl) {
        toast({
          title: "Upload failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      const storyData = {
        image: imageUrl,
        captions: caption,
      };

      await dispatch(createStory({ story: storyData, jwt: token }));

      toast({
        title: "Story created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error creating story:", error);
      toast({
        title: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      p={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg="white" p={8} borderRadius="xl" boxShadow="md" w="100%" maxW="md">
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          mb={6}
          textAlign="center"
          color="gray.700"
        >
          Create New Story
        </Text>

        <Box as="form" onSubmit={handleSubmit}>
          <Box
            border="2px dashed"
            borderColor="gray.200"
            borderRadius="lg"
            p={6}
            textAlign="center"
            cursor="pointer"
            mb={6}
            bg="gray.50"
            _hover={{ borderColor: "blue.200" }}
            transition="border-color 0.2s"
            onClick={() => fileInputRef.current.click()}
          >
            {previewImage ? (
              <AspectRatio ratio={9 / 16} w="100%">
                <Image
                  src={previewImage}
                  alt="Preview"
                  borderRadius="md"
                  objectFit="cover"
                />
              </AspectRatio>
            ) : (
              <Flex
                direction="column"
                align="center"
                justify="center"
                h="200px"
              >
                <Icon as={FiImage} boxSize={8} color="gray.400" mb={4} />
                <Text color="gray.500" mb={1}>
                  Click to upload image
                </Text>
                <Text fontSize="sm" color="gray.400">
                  (JPEG, PNG, WEBP)
                </Text>
              </Flex>
            )}
            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFilePick}
              display="none"
            />
          </Box>

          {previewImage && (
            <Box mb={6}>
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption..."
                size="md"
                bg="white"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                focusBorderColor="blue.400"
                rows={3}
                resize="vertical"
              />
            </Box>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
            loadingText="Publishing..."
            rightIcon={<FiCheck />}
            isDisabled={!previewImage}
            size="lg"
            mt={2}
          >
            Publish Story
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateStory;
