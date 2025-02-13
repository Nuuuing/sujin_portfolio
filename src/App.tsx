import './assets/css/main.css';

import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRouter } from './routes';
import { Spinner } from './components';

function App() {

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MainRouter />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
