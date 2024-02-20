import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = ({
  allItems,
  setAllItems,
  total,
  setTotal,
  setProductList,
}) => {
  const [actives, setActives] = useState(false);

  const getItems = () => {
    fetch("http://localhost:8000/grocery")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProductList(data);
      });
  };
  //método para eliminar un producto dentro del carrito y si llega a 0 se elimina
  const onDeleteProduct = (product) => {
    const results = allItems.filter((item) => item.id !== product.id);
    if (results) {
      const result = allItems.find((item) => item.id === product.id);
      if (result) {
        result.quantity = result.quantity - 1;
        if (!result.quantity) {
          setAllItems(results);
        } else {
          setAllItems([...results, { ...result, stock: result.stock + 1 }]);
        }
      }
      setTotal(total - product.price);
    }
    fetch(`http://localhost:8000/grocery/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: product.stock + 1 }),
    }).then(() => {
      getItems();
    });
  };
  //método para añadir un producto dentro del carrito
  const onAddProductCart = (product) => {
    const results = allItems.filter((item) => item.id !== product.id);
    const result = allItems.find((item) => item.id === product.id);
    if (result) {
      result.quantity = result.quantity + 1;
      setTotal(total + product.price);
      setAllItems([...results, { ...result, stock: result.stock - 1 }]);
    }
    fetch(`http://localhost:8000/grocery/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stock: product.stock - 1 }),
    }).then(() => {
      getItems();
    });
  };

  return (
    <header>
      <h1>Infine product list</h1>

      <div className="container-icon">
        <div
          className="container-cart-icon"
          data-testid="container-cart-icon"
          onClick={() => setActives(!actives)}
        >
          <h2>Cart</h2>
        </div>
        <div className="mobile-cart-icon">
          <Link to="/cartmobile">
            <h2>Cart</h2>
          </Link>
        </div>

        <div
          className={`container-cart-products ${actives ? "" : "hidden-cart"}`}
          data-testid="container-cart-products"
        >
          {allItems && allItems.length ? (
            <>
              <div className="row-product" data-testid="row-product">
                {allItems.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <figure className="cart-image">
                      <img
                        src={product.image_url.split(" ")[0]}
                        alt={product.productName}
                      />
                    </figure>
                    <div className="info-cart-product">
                      <span className="titulo-producto-carrito">
                        {product.productName}
                      </span>
                      <div className="info-quantity">
                        <button onClick={() => onDeleteProduct(product)}>
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button onClick={() => onAddProductCart(product)}>
                          +
                        </button>
                      </div>
                    </div>
                    <span className="precio-producto-carrito">
                      {product.price}€
                    </span>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Checkout</h3>
                <span className="total-pagar">{total}€</span>
              </div>
            </>
          ) : (
            <p className="cart-empty">The cart is empty</p>
          )}
        </div>
      </div>
    </header>
  );
};
