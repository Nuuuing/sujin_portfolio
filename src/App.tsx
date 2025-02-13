import './assets/css/main.css';

import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRouter } from './routes';
import { Spinner } from './components';

function App() {
  const DelayedRouter = lazy(() => new Promise<{ default: React.ComponentType<any> }>(resolve => setTimeout(() => resolve({ default: MainRouter }), 5000)));

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <DelayedRouter />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
