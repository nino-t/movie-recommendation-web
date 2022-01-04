import React from "react";
import axios from "axios";
import _get from "lodash/get";
import { Link } from "react-router-dom";
import { Box, Heading, SimpleGrid, Image, Stack, Badge } from "@chakra-ui/react";

const BrowsePage = () => {
  const [movies, setMovies] = React.useState([]);
  const [recommendation, setRecommendation] = React.useState([]);
  let token = localStorage.getItem("token");

  const getMovieList = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + "/movies");
      const results = _get(response, "data.data", []);
      setMovies(results);
    } catch (error) {
      console.log("Oops, something went wrong!", error);
    }
  };

  const getMovieRecommendation = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/my-recommendation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const results = _get(response, "data.data", []);
      setRecommendation(results);
    } catch (error) {
      console.log("Oops, something went wrong!", error);
    }
  };

  React.useEffect(() => {
    getMovieList();
    if (token) {
      getMovieRecommendation(token);
    }
  }, []);

  return (
    <>
      {recommendation.length > 0 && (
        <Box mb={10}>
          <Heading as="h3" fontSize="2xl" mb={4}>
            Your Movie Recommendation
          </Heading>
          <SimpleGrid columns={6} spacing={8}>
            {recommendation.map((movie, index) => (
              <Link to={`/watch?v=${movie.id}`} key={index}>
                <Box cursor="pointer">
                  <Image
                    src={`https://via.placeholder.com/260x430?text=${movie.name}`}
                    alt={movie.name}
                    w={"full"}
                  />
                  <Heading as="h4" fontSize="md" mt={3} color="#34495e">
                    {movie.name}
                  </Heading>
                  <Stack direction="row" mt={2}>
                    {movie.result_genres.map((genre) => (
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

      <Box>
        <Heading as="h3" fontSize="2xl" mb={4}>
          Movie List
        </Heading>
        <SimpleGrid columns={6} spacing={8}>
          {movies.map((movie, index) => (
            <Link to={`/watch?v=${movie.id}`} key={index}>
              <Box cursor="pointer">
                <Image
                  src={`https://via.placeholder.com/260x430?text=${movie.name}`}
                  alt={movie.name}
                  w={"full"}
                />
                <Heading as="h4" fontSize="md" mt={3} color="#34495e">
                  {movie.name}
                </Heading>
                <Stack direction="row" mt={2}>
                  {movie.result_genres.map((genre) => (
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
    </>
  );
};

export default BrowsePage;
