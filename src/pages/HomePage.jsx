import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../api/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {error && <p>Failed to fetch trending movies</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
