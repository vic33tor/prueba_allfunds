import { CartMobile } from "./components/CartMobile";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [allItems, setAllItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState(null);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                allItems={allItems}
                setAllItems={setAllItems}
                total={total}
                setTotal={setTotal}
                productList={productList}
                setProductList={setProductList}
              />
            }
          />
          <Route
            path="/cartmobile"
            element={
              <CartMobile
                allItems={allItems}
                setAllItems={setAllItems}
                total={total}
                setTotal={setTotal}
                productList={productList}
                setProductList={setProductList}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};
const Home = ({
  allItems,
  setAllItems,
  total,
  setTotal,
  productList,
  setProductList,
}) => {
  return (
    <>
      <Header
        allItems={allItems}
        setAllItems={setAllItems}
        total={total}
        setTotal={setTotal}
        productList={productList}
        setProductList={setProductList}
      />
      <ProductList
        allItems={allItems}
        setAllItems={setAllItems}
        total={total}
        setTotal={setTotal}
        productList={productList}
        setProductList={setProductList}
      />
    </>
  );
};

export default App;
