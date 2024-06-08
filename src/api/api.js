import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjliMzEzZGE0Y2FkZTc1ZGM0MDc0OTY2YTU4ODUwMyIsInN1YiI6IjY2NjM0MWRjOWIxYjBjNTYwYzgzNDhlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9_TSR4Oy39Hg7iIz0D6hwYyQFTkoUccC5uA2oLqdHdo';
