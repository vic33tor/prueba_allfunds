import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import { MemoryRouter } from "react-router-dom";

// Test unitario para comprobar si el componente se renderiza correctamente
test("renders Header component", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const headerTitle = screen.getByText("Infine product list");
  expect(headerTitle).toBeInTheDocument();
});

// Test unitario para comprobar si se muestra un mensaje de carrito vacío cuando no hay productos en el carrito
test("shows empty cart message when cart is empty", () => {
  render(
    <MemoryRouter>
      <Header allItems={[]} />
    </MemoryRouter>
  );
  const emptyCartMessage = screen.getByText("The cart is empty");
  expect(emptyCartMessage).toBeInTheDocument();
});

test("toggles cart visibility", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // Comprueba que el contenedor del icono del carrito esté presente
  const containerCartIcon = screen.getByTestId("container-cart-icon");
  expect(containerCartIcon).toBeInTheDocument();

  // Comprueba que el contenedor del carrito esté presente
  const containerCartProducts = screen.queryByTestId("container-cart-products");
  expect(containerCartProducts).toBeInTheDocument();

  // Comprueba que el contenedor del carrito esté oculto inicialmente
  const row_product = screen.queryByTestId("row-product");
  expect(row_product).not.toBeInTheDocument();
});
