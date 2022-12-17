import { ChangeEvent, FormEvent, useState } from 'react';

import { Header } from './components/Header';
import { TodoItem } from './components/TodoItem';

import { PlusCircle } from 'phosphor-react';
import clipboardIcon from './assets/clipboard.svg';

import './global.css';
import styles from './App.module.css';

interface TodoProps {
  id: string;
  description: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [todoDescription, setTodoDescription] = useState('');
  
  function handleNewTodoDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    setTodoDescription(event.target.value);
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault();
    
    const newTodo = {
      id: Date.now().toString(),
      description: todoDescription,
      completed: false,
    }

    setTodos((state) => [...state, newTodo]);
  }

  function changeTodoCompletition(todoId: string) {
    const todosWithCompletedOne = todos.map(todo => {
      return todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
    
    setTodos(todosWithCompletedOne);
  }

  function deleteTodo(todoId: string) {
    const todosWithoutDeletedOne = todos.filter(todo => todo.id !== todoId);

    setTodos(todosWithoutDeletedOne);
  }

  const completeTodosCount = todos.filter(todo => todo.completed === true).length;

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTodo} className={styles.todoForm}>
          <input
            type="text"
            placeholder='Adicione uma nova tarefa'
            onChange={handleNewTodoDescriptionChange}
          />
          <button type="submit">
            Criar <PlusCircle size={20} weight="bold" />
          </button>
        </form>

        <section className={styles.content}>
          <header>
            <strong>
              Tarefas criadas<span>{todos.length}</span>
            </strong>
            
              {todos.length ? (
                <strong>
                  Concluídas<span>{completeTodosCount} de {todos.length}</span>
                </strong>
              ) : (
                <strong>
                  Concluídas<span>{todos.length}</span>
                </strong>
              )}
          </header>

          {todos.length > 0 ? (
            <div className={styles.todoList}>
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onChangeTodoCompletition={changeTodoCompletition}
                  onDeleteTodo={deleteTodo}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyTodoList}>
              <img src={clipboardIcon} alt="Clipboard icon" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default App
