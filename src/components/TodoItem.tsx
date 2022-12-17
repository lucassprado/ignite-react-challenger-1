import { ChangeEvent } from 'react';
import { Trash } from 'phosphor-react';

import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: {
    id: string;
    description: string;
    completed: boolean;
  },
  onChangeTodoCompletition: (todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

export function TodoItem({
  todo: { id, description, completed },
  onChangeTodoCompletition,
  onDeleteTodo
}: TodoItemProps) {
  function handleChangeTodoCompletition() {
    onChangeTodoCompletition(id);
  }
  
  function handleDeleteTodo() {
    onDeleteTodo(id);
  }

  return (
    <div className={styles.todo}>
      <div>
        <input
          type="checkbox"
          title="Marcar o todo como finalizado ou pendente"
          checked={completed}
          onChange={handleChangeTodoCompletition}
        />

        <span>{description}</span>
      </div>
      
      <button onClick={handleDeleteTodo} title="Deletar todo">
        <Trash size={24} />
      </button>
    </div>
  );
}