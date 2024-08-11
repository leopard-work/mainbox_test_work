import { render, fireEvent } from "@testing-library/react";
import { Form } from "./Form";

describe("Form", () => {
  it("Рендер компонента", () => {
    render(<Form onAddTodo={jest.fn()} />);
  });

  it("Обработка ввода", () => {
    const { getByPlaceholderText } = render(<Form onAddTodo={jest.fn()} />);
    const input = getByPlaceholderText("Add a new todo");
    fireEvent.change(input, { target: { value: "Test" } });
    expect((input as HTMLInputElement).value).toBe("Test");
  });

  it("Обработка нажатия кнопки", () => {
    const onAddTodoMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Form onAddTodo={onAddTodoMock} />,
    );
    const input = getByPlaceholderText("Add a new todo");
    const button = getByText("Add");
    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(button);
    expect(onAddTodoMock).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBe("");
  });
});
