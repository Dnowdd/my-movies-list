import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

import Home from './Routes/Home';
import Favorites from './Routes/Favorites';
import Popular from './Routes/Popular';
import Search from './Routes/Search';

export default function App() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <Router>
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route exact path='/favorites' element={<Favorites/>} />
          <Route exact path='/popular' element={<Popular/>} />
          <Route exact path='/search' element={<Search/>} />
        </Routes>
      </Router>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);