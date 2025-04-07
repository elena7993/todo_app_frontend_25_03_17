import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import Header from "../componenets/Header";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "../api";
import { IEditProfile, IUser } from "../types";

const EditProfile = () => {
  const CameraIcon = FaCamera as unknown as React.FC;
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<IEditProfile>();

  useEffect(() => {
    setValue("name", user?.name || "");
    setValue("email", user?.email || "");
  }, [user, setValue]);

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      toast({
        title: "프로필 수정 완료",
        description: "성공적으로 변경되었습니다!",
        status: "success",
      });
      navigate("/profile");
    },
    onError: () => {
      toast({
        title: "오류",
        description: "변경할 수 없습니다!",
        status: "error",
      });
    },
  });

  const onSubmit = (data: IEditProfile) => {
    console.log(data);
    const { name, email } = data;
    mutation.mutate({
      name,
      email,
    });
  };

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
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} p={"15px"}>
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
