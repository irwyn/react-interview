import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';

const HomePage = () => {
  const navigate = useNavigate();
  useMount(() => navigate('/carriers/reports'));

  return null;
};

export default HomePage;
