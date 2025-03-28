import { Box, Button, Text } from "@chakra-ui/react";
import Header from "../componenets/Header";
import Container from "../componenets/Container";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ITodos } from "../types";
import { getTodoDetail } from "../api";

const Detail = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<ITodos>({
    queryKey: ["detail", id],
    queryFn: getTodoDetail,
  });

  console.log(data);

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
        <Text>{data?.title}</Text>
        <Text>{data?.payload}</Text>
      </Container>

      <Link to={`/detail/${id}/edit`} state={"good"}>
        <Button>수정하기</Button>
      </Link>
    </Box>
  );
};

export default Detail;
