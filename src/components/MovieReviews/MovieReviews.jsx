import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/api';
import toast from 'react-hot-toast';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
        toast.error('Failed to fetch reviews');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Failed to fetch reviews</p>}
      {reviews.length === 0 ? (
        <p>We don't have any reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
