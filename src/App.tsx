import React, { useState, useCallback, useEffect } from 'react';
    import { Todo } from './types';
    import TodoForm from './components/TodoForm';
    import TodoList from './components/TodoList';
    import { ListTodo } from 'lucide-react'; // For the logo

    function App() {
      const [todos, setTodos] = useState<Todo[]>(() => {
        // Initialize from localStorage if available
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });

      // Save todos to localStorage whenever they change
      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = useCallback((text: string) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(), // Generates a unique ID
          text,
          completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      }, []);

      const toggleTodoComplete = useCallback((id: string) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }, []);

      const editTodo = useCallback((id: string, newText: string) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          )
        );
      }, []);

      const deleteTodo = useCallback((id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }, []);

      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-8 sm:p-10 space-y-8 border border-gray-100">
            <div className="flex flex-col items-center justify-center space-y-4">
              <ListTodo className="text-purple-600" size={48} />
              <h1 className="text-4xl font-extrabold text-center text-gray-900 leading-tight">
                My <span className="text-purple-600">Task</span> List
              </h1>
              <p className="text-gray-600 text-center max-w-md">
                Organize your day, stay productive, and conquer your goals one task at a time.
              </p>
            </div>
            <TodoForm onAddTodo={addTodo} />
            <TodoList
              todos={todos}
              onToggleComplete={toggleTodoComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>
        </div>
      );
    }

    export default App;