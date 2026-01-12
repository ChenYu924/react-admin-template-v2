import PrimaryLayoutProvider from '@/layouts/provider/PrimaryLayoutProvider.jsx';
import RouteList from '@/layouts/routes/RouteList.jsx';

function App() {
  return (
    <PrimaryLayoutProvider>
      <RouteList />
    </PrimaryLayoutProvider>
  );
}

export default App;
