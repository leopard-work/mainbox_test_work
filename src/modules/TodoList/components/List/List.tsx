import styles from "./List.module.scss";
import { TodoListProps } from "@modules/TodoList/TodoList";
import cn from "classnames";

interface ListProps {
  todoList: TodoListProps[];
  onEditTodo: ({ todoItem }: { todoItem: TodoListProps }) => void;
}

const List = ({ todoList, onEditTodo }: ListProps) => {
  const handleItemClick = (todo: TodoListProps) => () => {
    onEditTodo({ todoItem: todo });
  };

  return (
    <ul className={styles.list}>
      {todoList.map((todo) => (
        <li
          key={todo.id}
          className={cn(styles.item, { done: todo.done })}
          onClick={handleItemClick(todo)}
        >
          <span className={styles.itemCheckbox}>
            {todo.done && <>&#10004;</>}
          </span>{" "}
          {todo.text}
        </li>
      ))}
    </ul>
  );
};

export { List };
