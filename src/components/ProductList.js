import React, { useEffect } from "react";

export const ProductList = ({
  allItems,
  setAllItems,
  productList,
  setTotal,
  total,
  setProductList,
}) => {
  const getItems = () => {
    fetch("http://localhost:8000/grocery")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProductList(data);
      });
  };
  //método para añadir producto al carrito en donde comprueba que quede stock y resta 1 del stock
  const onAddProduct = (item) => {
    if (item.stock !== 0) {
      const product = allItems.find((product) => product.id === item.id);
      if (product) {
        product.quantity = product.quantity + 1;
      } else {
        setAllItems([
          ...allItems,
          { ...item, quantity: 1, stock: item.stock - 1 },
        ]);
      }
      setTotal(total + item.price);
      fetch(`http://localhost:8000/grocery/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: item.stock - 1 }),
      }).then(() => {
        getItems();
      });
    }
  };
  // carga la lista de productos al cargar la página
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container-items">
      {productList &&
        productList.map((item) => (
          <div className="item" key={item.id}>
            <figure className="product-image">
              <img src={item.image_url.split(" ")[0]} alt={item.productName} />
            </figure>
            <div className="info-product">
              <div className="name-price">
                <h3>{item.productName}</h3>
                <h3>{item.price}€</h3>
              </div>
              <p className="description">{item.productDescription}</p>
              <div className="stock-add">
                <span>{item.stock} left</span>
                <button onClick={() => onAddProduct(item)}>+ add</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
