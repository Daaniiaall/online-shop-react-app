import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import ProductsPage from "./pages/ProductsPage";
import DetailsPage from "./pages/DetailsPage";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/404";
// import ProductsProvider from "./context/ProductsContext";
// import CartProvider from "./context/CartContext";

import { Provider } from "react-redux";

import store from "./app/store";

function App() {
  return (
    // <CartProvider>
    // <ProductsProvider>
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/Products" replace />} />
          <Route path="/Products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<DetailsPage />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Provider>
    // </ProductsProvider>
    // </CartProvider>
  );
}

export default App;
