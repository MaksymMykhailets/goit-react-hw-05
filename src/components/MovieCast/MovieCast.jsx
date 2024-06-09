import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api/api';
import toast from 'react-hot-toast';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError(true);
        toast.error('Failed to fetch cast');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to fetch cast</p>}
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://via.placeholder.com/200'
              }
              alt={actor.name}
              width={100}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
