import { BrowserRouter } from 'react-router-dom';
import PrimaryLayoutProvider from '@/layouts/provider/PrimaryLayoutProvider.jsx';
import RouteList from '@/layouts/routes/RouteList.jsx';

function App() {
  return (
    <BrowserRouter>
      <PrimaryLayoutProvider>
        <RouteList />
      </PrimaryLayoutProvider>
    </BrowserRouter>
  );
}

export default App;
