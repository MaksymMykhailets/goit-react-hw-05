import { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../api/api';
import toast, { Toaster } from 'react-hot-toast';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
        toast.error('Failed to fetch movie details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const backLocation = location.state?.from ?? '/movies';

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : '';

  return (
    <div>
      <Link to={backLocation}>Back</Link>
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to fetch movie details</p>}
      {movie && (
        <>
          <h1>
            {movie.title} ({releaseYear})
          </h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <img src={posterUrl} alt={movie.title} width={250} />
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
          {/* <nav>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
          </nav> */}
          <Outlet />
        </>
      )}
      <Toaster />
    </div>
  );
};

export default MovieDetailsPage;
