import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Result from './pages/Result';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      {/* <div className="main-content"> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
