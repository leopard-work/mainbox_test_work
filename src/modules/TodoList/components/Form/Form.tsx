import styles from "./Form.module.scss";
import { TodoListProps } from "@modules/TodoList/TodoList";
import { useState } from "react";
import getId from "@shared/utils/getId";

interface FormProps {
  onAddTodo: ({ todoItem }: { todoItem: TodoListProps }) => void;
}

const Form = ({ onAddTodo }: FormProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: TodoListProps = {
      id: getId(),
      text: inputValue.trim(),
      done: false,
    };

    onAddTodo({ todoItem: newTodo });
    setInputValue("");
  };

  return (
    <form
      role="form"
      data-testid="form"
      className={styles.wrapper}
      onSubmit={handleSubmit}
    >
      <input
        className={styles.inputText}
        type="text"
        placeholder="Add a new todo"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export { Form };
