import React from 'react';
    import { Todo } from '../types';
    import TodoItem from './TodoItem';

    interface TodoListProps {
      todos: Todo[];
      onToggleComplete: (id: string) => void;
      onDelete: (id: string) => void;
      onEdit: (id: string, newText: string) => void;
    }

    const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete, onEdit }) => {
      if (todos.length === 0) {
        return (
          <p className="text-center text-gray-500 text-lg mt-8">
            No tasks yet! Add a new task above.
          </p>
        );
      }

      return (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      );
    };

    export default TodoList;