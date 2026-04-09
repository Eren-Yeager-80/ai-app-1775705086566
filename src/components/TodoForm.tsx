import React, { useState } from 'react';
    import { Plus } from 'lucide-react';

    interface TodoFormProps {
      onAddTodo: (text: string) => void;
    }

    const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
      const [inputText, setInputText] = useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
          onAddTodo(inputText.trim());
          setInputText('');
        }
      };

      return (
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            aria-label="New todo text"
          />
          <button
            type="submit"
            className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
            aria-label="Add todo"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </form>
      );
    };

    export default TodoForm;