import { RouterProvider } from 'react-router-dom';
import router from './router';
import PrimaryLayoutProvider from '@/layouts/provider/PrimaryLayoutProvider.jsx';

function App() {
  return (
    <PrimaryLayoutProvider>
      <RouterProvider router={router}></RouterProvider>
    </PrimaryLayoutProvider>
  );
}

export default App;
