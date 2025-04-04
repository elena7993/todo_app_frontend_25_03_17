import { Box, Button, Text, useToast } from "@chakra-ui/react";
import Header from "../componenets/Header";
import Container from "../componenets/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ITodoEditVaild, ITodos } from "../types";
import { deleteTodo, getTodoDetail } from "../api";

const Detail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<ITodos>({
    queryKey: ["detail", id],
    queryFn: getTodoDetail,
  });

  console.log(data);

  const toast = useToast();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast({
        title: "삭제",
        description: "삭제하였습니다",
        status: "success",
      });
      navigate(`/`);
    },
    onError: () => {
      toast({
        title: "에러",
        description: "삭제 할 수 없습니다",
        status: "error",
      });
    },
  });

  const onclickDelete = () => {
    mutation.mutate({
      id: Number(id),
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
      {!isLoading ? (
        <>
          {" "}
          <Container>
            <Text>{data?.title}</Text>
            <Text>{data?.payload}</Text>
          </Container>
          <Link to={`/detail/${id}/edit`} state={"good"}>
            <Button>수정하기</Button>
          </Link>
          <Button onClick={onclickDelete}>삭제하기</Button>
        </>
      ) : (
        "loading..."
      )}
    </Box>
  );
};

export default Detail;
