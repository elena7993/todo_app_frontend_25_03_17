import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import Header from "../componenets/Header";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useUser from "../lib/useUser";

const EditProfile = () => {
  const CameraIcon = FaCamera as unknown as React.FC;
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("name", user?.name);
    setValue("email", user?.email);
  }, [user, setValue]);

  return (
    <Box
      maxW={"450px"}
      w={"100%"}
      margin={"0 auto"}
      bgColor={"white"}
      minH={"100vh"}
      h={"100%"}
    >
      <Header />
      <Box mt={"30px"}>
        <VStack as="form" p={"15px"}>
          <Input
            accept="image/*"
            type="file"
            id="avatarFile"
            display={"none"}
          />

          <Box pos={"relative"} mb={"30px"}>
            <FormLabel htmlFor="avatarFile" cursor={"pointer"}>
              <Avatar src={user?.username} name={user?.username} size={"xl"} />
              <Box
                fontSize={"14px"}
                pos={"absolute"}
                bottom={"10px"}
                right={"10px"}
                bgColor={"white"}
                rounded={"full"}
                p={"5px"}
                boxShadow={"md"}
              >
                <CameraIcon />
              </Box>
            </FormLabel>
          </Box>

          <FormControl>
            <FormLabel fontWeight={"700"}>Name</FormLabel>
            <Input
              {...register("name", {
                required: false,
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={"700"}>Email</FormLabel>
            <Input
              {...register("email", {
                required: false,
              })}
            />
          </FormControl>

          <Button mt={"30px"} w={"100%"} colorScheme="green" type={"submit"}>
            Edit Profile
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default EditProfile;
