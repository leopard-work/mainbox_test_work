import styles from "./TodoList.module.scss";
import { useEffect, useState } from "react";
import getId from "@shared/utils/getId";
import { Footer, Form, List } from "@modules/TodoList/components";

interface TodoListProps {
  id: string;
  text: string;
  done: boolean;
}

type TodoStatusProps = "all" | "done" | "undone";

const InitialTodoList = [
  { id: getId(), text: "Тестовое задание 1", done: false },
  { id: getId(), text: "Тестовое задание 2", done: true },
];

const filterTodos = (todoList: TodoListProps[], status: TodoStatusProps) => {
  const filters = {
    all: () => todoList,
    done: () => todoList.filter((el) => !el.done),
    undone: () => todoList.filter((el) => el.done),
  };

  return filters[status]();
};

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoListProps[]>(InitialTodoList);
  const [filterTodoList, setFilterTodoList] = useState(InitialTodoList);
  const [todoStatus, setTodoStatus] = useState<TodoStatusProps>("all");

  useEffect(() => {
    setFilterTodoList(filterTodos(todoList, todoStatus));
  }, [todoList, todoStatus]);

  const handleAddTodo = ({ todoItem }: { todoItem: TodoListProps }) => {
    setTodoList((previous) => [...previous, todoItem]);
  };

  const handleEditTodo = ({ todoItem }: { todoItem: TodoListProps }) => {
    setTodoList((previous) =>
      previous.map((el) =>
        el.id === todoItem.id ? { ...el, done: !el.done } : el,
      ),
    );
  };

  const handleClearTodo = () => {
    setTodoList((previous) => previous.filter((el) => !el.done));
  };

  const handleFilterTodo = (type: TodoStatusProps) => {
    setTodoStatus(type);
  };

  return (
    <div className={styles.wrapper}>
      <h1>TODOS</h1>
      <Form onAddTodo={handleAddTodo} />
      <List todoList={filterTodoList} onEditTodo={handleEditTodo} />
      <Footer
        onFilterTodoList={handleFilterTodo}
        onClearTodoList={handleClearTodo}
        todoStatus={todoStatus}
      />
    </div>
  );
};

export { TodoList };
export type { TodoListProps, TodoStatusProps };
