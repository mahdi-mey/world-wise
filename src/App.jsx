import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/Product';
import Pricing   from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="products" element={<Products />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />

        <Route path='app' element={<AppLayout />}>
          <Route index element={<p>List of cities</p>} />
          <Route path='cities' element={<p>list of cities</p>} />
          <Route path='countries' element={<p>Countries</p>} />
          <Route path='form' element={<p>Form element</p>} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;