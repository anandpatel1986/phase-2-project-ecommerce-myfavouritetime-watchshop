import { React, useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import { Switch, Route } from "react-router-dom";
import AddNewProduct from "./components/addNewProduct/AddNewProduct";
import { useCart } from "./cartContext/cartContext";
import "./App.css";

function App() {
  const { cartItemCount } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://backend-myfavouritetime.onrender.com/products")
      .then((r) => r.json())
      .then((products) => {
        setLoading(true);
        setProducts(products);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <NavBar cartItemCount={cartItemCount()} />
      <Switch>
        <Route exact path="/">
          <Products loading={loading} setLoading={setLoading} products={products} setProducts={setProducts} />
        </Route>
        <Route path="/product/:productId">
          <Product />
        </Route>
        <Route path="/addnewproduct">
          <AddNewProduct products={products} setProducts={setProducts} />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="*">
          <h1>Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
