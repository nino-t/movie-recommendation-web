import React from "react";
import axios from "axios";
import _get from "lodash/get";
import _truncate from "lodash/truncate";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";
import { Box, Flex, Image, Heading, SimpleGrid, Text, Badge, Stack } from "@chakra-ui/react";

const WatchPage = () => {
  let [searchParams] = useSearchParams();
  let v = searchParams.get("v");
  const [movie, setMovie] = React.useState(null);
  const [movies, setMovies] = React.useState([]);

  const getMovie = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:3004/movies/${movieId}`);
      const results = _get(response, "data.data", null);
      setMovie(results);
    } catch (error) {
      console.log("Oops, something went wrong!", error);
    }
  };

  const getMovieRecommendation = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:3004/movies/${movieId}/recommendation`);
      const results = _get(response, "data.data", []);
      setMovies(results);
    } catch (error) {
      console.log("Oops, something went wrong!", error);
    }
  };

  React.useEffect(() => {
    getMovie(v);
    getMovieRecommendation(v);
  }, [v]);

  if (!movie) {
    return null;
  }

  return (
    <Box>
      <Flex>
        <Box w="70%" h="550px" bg="tomato" overflow={"hidden"}>
          <Image
            w={"full"}
            h={"full"}
            src="https://douglasgreen.com/wp-content/uploads/2014/03/video-play-btn-featured-1400x788.png"
            alt="Play"
            cursor={"pointer"}
          />
        </Box>
        <Box flex={1} h="550px" bg="gray.100" p={6} overflowY="auto" overscrollBehaviorY={"auto"}>
          <Heading as="h4" fontSize="xl" mt={3} color="#34495e">
            {movie.name}
          </Heading>
          <Badge colorScheme="red">{moment(movie.release_date, "YYYY-MM-DD").format("YYYY")}</Badge>
          <Text fontSize={"md"} textAlign={"justify"} my={4}>
            {movie.synopsis}
          </Text>

          <Box mb={6}>
            <Text fontSize={"md"} fontWeight={"bold"}>
              Genre:
            </Text>
            <Stack direction="row">
              {movie.genres.map((genre) => (
                <Badge colorScheme="green" key={genre.id}>
                  {genre.title}
                </Badge>
              ))}
            </Stack>
          </Box>

          <Box mb={6}>
            <Text fontSize={"md"} fontWeight={"bold"} mb={2}>
              Casts:
            </Text>
            <SimpleGrid columns={4} spacing={8}>
              {movie.casts.map((cast) => (
                <Flex justify={"center"} alignItems={"center"} direction={"column"} key={cast.id}>
                  <Image
                    w={45}
                    h={45}
                    src="https://www.smpn17kotabekasi.sch.id/images/account-icon.png"
                    rounded="full"
                    mb={2}
                  />
                  <Text fontSize={"sm"} title={cast.name} textAlign={"center"}>
                    {_truncate(cast.name, { length: 20 })}
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>

      {movies.length > 0 && (
        <Box mt={10}>
          <Heading as="h3" fontSize="xl" mb={4}>
            Recommendation
          </Heading>
          <SimpleGrid columns={6} spacing={8}>
            {movies.map((xmovie, index) => (
              <Link to={`/watch?v=${xmovie.id}`} key={index}>
                <Box cursor="pointer">
                  <Image
                    src={`https://via.placeholder.com/260x430?text=${xmovie.name}`}
                    alt={xmovie.name}
                    w={"full"}
                  />
                  <Heading as="h4" fontSize="md" mt={3} color="#34495e">
                    {xmovie.name}
                  </Heading>
                  <Stack direction="row" mt={2}>
                    {xmovie.result_genres.map((genre) => (
                      <Badge colorScheme="green" key={genre.id}>
                        {genre.title}
                      </Badge>
                    ))}
                  </Stack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default WatchPage;
