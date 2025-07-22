import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { OrderTableFilters } from "./order-table-filters";

function Wrapper() {
  return (
    <MemoryRouter>
      <OrderTableFilters />
    </MemoryRouter>
  );
}

describe("OrderTableFilters", () => {
  it("should fills the form fields and submits, updating the field values", () => {
    render(<Wrapper />);
    fireEvent.change(screen.getByPlaceholderText("ID do pedido"), { target: { value: "123" } });
    fireEvent.change(screen.getByPlaceholderText("Nome do cliente"), { target: { value: "Luana" } });
    fireEvent.click(screen.getByText("Filtrar resultados"));

    expect(screen.getByPlaceholderText("ID do pedido")).toHaveValue("123");
    expect(screen.getByPlaceholderText("Nome do cliente")).toHaveValue("Luana");
  });

  it("should clears the fields when clicking the reset button", () => {
    render(<Wrapper />);
    fireEvent.change(screen.getByPlaceholderText("ID do pedido"), { target: { value: "123" } });
    fireEvent.change(screen.getByPlaceholderText("Nome do cliente"), { target: { value: "Luana" } });
    fireEvent.click(screen.getByText("Filtrar resultados"));

    fireEvent.click(screen.getByText("Remover filtros"));

    expect(screen.getByPlaceholderText("ID do pedido")).toHaveValue("");
    expect(screen.getByPlaceholderText("Nome do cliente")).toHaveValue("");
  });
});