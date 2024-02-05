import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from '../pages/Products';
import Pricing   from '../pages/Pricing';
import Homapage from '../pages/Homapage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homapage />} />
        <Route path="products" element={<Products />} />
        <Route path='pricing'  element={<Pricing /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;