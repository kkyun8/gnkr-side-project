import axios from 'axios';

export default axios.create(
    {
      //proxy로 CORS해결
      //baseURL: 'http://localhost:4000/',
      withCredentials: true,
    }
  );