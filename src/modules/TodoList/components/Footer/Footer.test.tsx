import { render, screen, fireEvent } from "@testing-library/react";
import { Footer } from "./Footer";
import { TodoStatusProps } from "@modules/TodoList/TodoList";
import "@testing-library/jest-dom";

describe("Footer", () => {
  const mockOnClearTodoList = jest.fn();
  const mockOnFilterTodoList = jest.fn();

  const renderFooter = (todoStatus: TodoStatusProps) => {
    render(
      <Footer
        todoStatus={todoStatus}
        onClearTodoList={mockOnClearTodoList}
        onFilterTodoList={mockOnFilterTodoList}
      />,
    );
  };

  it("Отображение кнопок", () => {
    renderFooter("all");

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });

  it("Нажатие на кнопку фильтра", () => {
    renderFooter("done");

    expect(screen.getByText("Active")).toHaveClass("active");
    expect(screen.getByText("All")).not.toHaveClass("active");
    expect(screen.getByText("Completed")).not.toHaveClass("active");
  });

  it("Вызов onFilterTodoList", () => {
    renderFooter("all");

    fireEvent.click(screen.getByText("Completed"));
    expect(mockOnFilterTodoList).toHaveBeenCalledWith("undone");

    fireEvent.click(screen.getByText("Active"));
    expect(mockOnFilterTodoList).toHaveBeenCalledWith("done");
  });

  it("Нажатие на кнопку очистки списка", () => {
    renderFooter("all");

    fireEvent.click(screen.getByText("Clear completed"));
    expect(mockOnClearTodoList).toHaveBeenCalled();
  });
});
