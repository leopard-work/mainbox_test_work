import { render, screen } from "@testing-library/react";
import { List } from "./List";

describe("List", () => {
  const onEditTodo = jest.fn();

  const todoList: any = [
    { id: 1, text: "Test Todo 1", done: false },
    { id: 2, text: "Test Todo 2", done: true },
  ];

  const props: any = {
    todoList,
    onEditTodo,
  };

  test("Рендер компонента", () => {
    render(<List {...props} />);

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(2);
  });

  test("Нажатие на элемент", () => {
    render(<List {...props} />);

    const firstItem = screen.getByText("Test Todo 1");
    firstItem.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onEditTodo).toHaveBeenCalledWith({ todoItem: todoList[0] });
  });
});
