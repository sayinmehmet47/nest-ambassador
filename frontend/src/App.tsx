import { AppProvider } from '../src/providers/app';
import { AppRoutes } from '../src/routes/index';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
