import styles from "./Footer.module.scss";
import { TodoStatusProps } from "@modules/TodoList/TodoList";

interface FooterProps {
  todoStatus: TodoStatusProps;
  onClearTodoList: () => void;
  onFilterTodoList: (type: TodoStatusProps) => void;
}

interface FilterButton {
  name: TodoStatusProps;
  label: string;
}

const Footer = ({
  todoStatus,
  onClearTodoList,
  onFilterTodoList,
}: FooterProps) => {
  const filterButtons: FilterButton[] = [
    {
      name: "all",
      label: "All",
    },
    { name: "done", label: "Active" },
    { name: "undone", label: "Completed" },
  ];

  return (
    <div className={styles.wrapper}>
      <div>
        {filterButtons.map(({ name, label }) => (
          <button
            className={todoStatus === name ? "active" : ""}
            key={name}
            onClick={() => onFilterTodoList(name)}
          >
            {label}
          </button>
        ))}
      </div>
      <div>
        <button onClick={onClearTodoList}>Clear completed</button>
      </div>
    </div>
  );
};

export { Footer };
