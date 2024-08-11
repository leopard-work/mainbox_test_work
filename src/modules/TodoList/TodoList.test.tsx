import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
  it("Добавление задачи", () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);
    const todoInput = getByPlaceholderText("Add a new todo");
    const addTodoButton = getByText("Add");

    fireEvent.change(todoInput, { target: { value: "new test todo" } });
    fireEvent.click(addTodoButton);

    expect(screen.getByText("new test todo")).toBeInTheDocument();
  });

  it("Отметка пункта задачи", () => {
    const { getByText } = render(<TodoList />);
    const todoItemCheckbox = getByText("Тестовое задание 1");

    fireEvent.click(todoItemCheckbox);

    expect(todoItemCheckbox).toHaveClass("done");
  });

  it("Фильтрация задач по фильтру", () => {
    const { getByText } = render(<TodoList />);
    const filterButton = getByText("Completed");

    fireEvent.click(filterButton);

    const todoItems = screen.getAllByRole("listitem");
    todoItems.forEach((todoItem) => {
      expect(todoItem).toHaveClass("done");
    });
  });
});
