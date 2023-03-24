import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import PageNotFound from './components/404/404';
import CardsContextProvider from './components/Cards/CardsContextProvider';
import DetailCard from './components/Cards/DetailCard';
import Description from './components/Description';
import Header from './components/Header/Header';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App container py-2">
        <Routes>
          <Route index element={<Main />} />
          <Route path="/cards" element={<CardsContextProvider />} />
          <Route path="/description" element={<Description />} />
          <Route path="/cards/:cardsId" element={<DetailCard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
