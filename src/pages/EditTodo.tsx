import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import Header from "../componenets/Header";
import Container from "../componenets/Container";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ITodoEditVaild, ITodos } from "../types";
import { getTodoDetail } from "../api";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";

const EditTodo = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<ITodos>({
    queryKey: ["detail", id],
    queryFn: getTodoDetail,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ITodoEditVaild>();

  const date = dayjs(data?.date);
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  useEffect(() => {
    if (data) {
      setValue("title", data?.title);
      setValue("payload", data?.payload);
      setValue(
        "date",
        `${year}-${String(month).padStart(2, "0")}-${String(month).padStart(
          2,
          "0"
        )}`
      );
    }
  }, [data, setValue, year, month, day]);

  const onSubmit = (data: ITodoEditVaild) => {
    console.log(data);
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

      <Container>
        <Text fontSize={"20px"} fontWeight={"700"} mb={"30px"}>
          Edit Todo
        </Text>
        <Box onSubmit={handleSubmit(onSubmit)} as="form">
          <Input
            {...register("title", {
              required: false,
            })}
          />
          <Textarea
            {...register("payload", {
              required: false,
            })}
            mt={5}
          />
          <Input
            {...register("date", {
              required: false,
            })}
            mt={5}
            type="date"
          />
          <Button mt={5} type="submit">
            수정하기
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EditTodo;
