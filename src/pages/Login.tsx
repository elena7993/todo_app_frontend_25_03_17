import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import livingDead from "../imgs/living-dead.png";

import React from "react";
import { useForm } from "react-hook-form";
import { ILogin } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const nav = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>();

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      toast({
        title: "로그인",
        description: "로그인 하였습니다.",
        status: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["me"],
      });
      nav("/");
    },
    onError: () => {
      toast({
        title: "에러",
        description: "로그인에 실패 하였습니다.",
        status: "error",
      });
    },
  });

  const onLogSubmit = (data: ILogin) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Box
      onSubmit={handleSubmit(onLogSubmit)}
      maxW={"450px"}
      w={"100%"}
      margin={"0 auto"}
      bgColor={"white"}
      minH={"100vh"}
      h={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"70px"}
    >
      <Text fontSize={"55px"} fontWeight={"bold"}>
        Login
      </Text>

      <Image w={"35%"} h={"35%"} src={livingDead}></Image>

      <Box
        as="form"
        display={"flex"}
        flexDirection={"column"}
        justifyItems={"center"}
      >
        <Box marginBottom={"30px"}>
          <Input
            {...register("username", {
              required: "아이디는 필수입니다",
            })}
            placeholder="Enter ID"
            marginBottom={"10px"}
          ></Input>

          <InputGroup size="md">
            <Input
              {...register("password", {
                required: "패스워드는 필수입니다",
              })}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            {errors.username?.message}

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Button
          type="submit"
          bgColor={"#000"}
          color={"#fff"}
          colorScheme={"green"}
        >
          Login
        </Button>
        <Text marginTop={"5px"} fontSize={"14px"}>
          Click here for Sign up
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
