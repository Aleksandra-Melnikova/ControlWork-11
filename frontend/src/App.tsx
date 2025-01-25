import './App.css'
import Layout from './components/UI/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';


const App = () => {

  return (
    <>
      <Layout>
        <Routes>
          {/*<Route path="/" element={<Product />} />*/}
          {/*<Route path="/products" element={<Product />} />*/}
          {/*<Route path="/add_products" element={<ProductsForm />} />*/}
          {/*<Route path="/products/:productsId" element={<DetailedProducts />} />*/}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={<h1 className={"text-center mt-5"}>Not found</h1>}
          />
        </Routes>
      </Layout>
    </>
  )
};

export default App
