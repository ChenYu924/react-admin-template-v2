import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomePage() {
  const navigate = useNavigate();
  const menuKey = useSelector((state) => state.system.menuKey);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
    if (token) {
      if (menuKey) {
        navigate(menuKey);
      } else {
        navigate('/workspace');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return null;
}

export default HomePage;
