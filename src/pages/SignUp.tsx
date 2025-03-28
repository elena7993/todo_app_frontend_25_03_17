import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Toast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ISignUp } from "../types";
import { userSignUp } from "../api";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const nav = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUp>();

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: () => {
      Toast({
        title: "회원가입",
        description: "회원가입 되었습니다.",
        status: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["me"],
      });
      nav("/");
    },
    onError: () => {
      Toast({
        title: "에러",
        description: "회원가입에 실패 하였습니다.",
        status: "error",
      });
    },
  });

  const onSignUpSubmit = (data: ISignUp) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Box
      onSubmit={handleSubmit(onSignUpSubmit)}
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
        SignUp
      </Text>

      <Box
        as="form"
        display={"flex"}
        flexDirection={"column"}
        justifyItems={"center"}
        padding={"0 40px"}
      >
        <Box marginBottom={"30px"}>
          <Input
            {...register("username", {
              required: "아이디는 필수입니다",
            })}
            placeholder="Enter ID"
            marginBottom={"20px"}
          ></Input>

          {errors.username?.message}

          <Input
            {...register("name", {
              required: "유저네임은 필수입니다",
            })}
            placeholder="Enter Name"
            marginBottom={"20px"}
          ></Input>

          {errors.name?.message}

          <Input
            {...register("email", {
              required: "이메일은 필수입니다",
            })}
            placeholder="Enter Email"
            marginBottom={"20px"}
          ></Input>

          {errors.email?.message}

          <InputGroup size="md" marginBottom={"10px"}>
            <Input
              {...register("password", {
                required: "패스워드는 필수입니다",
              })}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />

            {errors.password?.message}

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
          Sign Up
        </Button>
        <Link to={"/login"}>
          <Text
            marginTop={"5px"}
            fontSize={"14px"}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Click here for Login
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
