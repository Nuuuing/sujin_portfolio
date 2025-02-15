import './assets/css/main.css';

import { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { MainRouter } from './routes';
import { Spinner } from './components';
import ScrollToTop from './components/common/ScrollToTop';

function App() {

  return (
    <Suspense fallback={<Spinner />}>
      <HashRouter>
        <ScrollToTop />
        <MainRouter />
      </HashRouter>
    </Suspense>
  );
}

export default App;
