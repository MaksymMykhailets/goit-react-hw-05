import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';
import { searchMovies } from '../api/api';
import toast, { Toaster } from 'react-hot-toast';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      try {
        const data = await searchMovies(query);
        setMovies(data);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.elements.query.value;
    if (inputValue.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }
    setSearchParams({ query: inputValue });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {error && <p>Failed to fetch movies</p>}
      {!error && movies.length === 0 && query && <p>No movies found</p>}
      <MovieList movies={movies} />
      <Toaster />
    </div>
  );
};

export default MoviesPage;
