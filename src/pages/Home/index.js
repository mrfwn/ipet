import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const Home = () => {
  const { user } = useAuth();
  // const [images, setImages] = useState();
  const handleLoad = useCallback(() => {
    console.log(user.refreshToken);
    axios
      .get('https://photoslibrary.googleapis.com/v1/albums', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        // setImages(res.data);
        console.log(res.data);
      });
  }, [user]);
  useEffect(() => {
    handleLoad();
  }, [handleLoad]);
  return (
    <Container>
      <h1>ID:{user.id}</h1>
      <h1>Name:{user.displayName}</h1>
    </Container>
  );
};

export default Home;
