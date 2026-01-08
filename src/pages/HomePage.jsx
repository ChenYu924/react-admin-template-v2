import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
    if (token) {
      navigate('/workspace');
    } else {
      navigate('/login');
    }
  }, []);

  return null;
}

export default HomePage;
