import React, { useState } from 'react';
    import { Todo } from '../types';
    import { Edit, Trash2, Check, X } from 'lucide-react';

    interface TodoItemProps {
      todo: Todo;
      onToggleComplete: (id: string) => void;
      onDelete: (id: string) => void;
      onEdit: (id: string, newText: string) => void;
    }

    const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, onEdit }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [editText, setEditText] = useState(todo.text);

      const handleEdit = () => {
        if (editText.trim() && editText.trim() !== todo.text) {
          onEdit(todo.id, editText.trim());
        }
        setIsEditing(false);
      };

      const handleCancelEdit = () => {
        setEditText(todo.text);
        setIsEditing(false);
      };

      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleEdit();
        } else if (e.key === 'Escape') {
          handleCancelEdit();
        }
      };

      return (
        <li
          className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
            todo.completed ? 'bg-gray-100 opacity-70' : 'bg-white'
          }`}
        >
          <div className="flex items-center flex-grow min-w-0">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              className="mr-4 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
              aria-label={`Mark task "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyPress}
                className="flex-grow p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 mr-2"
                autoFocus
                aria-label="Edit todo text"
              />
            ) : (
              <span
                className={`text-lg flex-grow break-words ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                onDoubleClick={() => setIsEditing(true)}
              >
                {todo.text}
              </span>
            )}
          </div>
          <div className="flex space-x-2 ml-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 text-green-600 hover:text-green-800 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Save edit"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-gray-600 hover:text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  aria-label="Cancel edit"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:text-blue-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Edit task "${todo.text}"`}
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-red-600 hover:text-red-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Delete task "${todo.text}"`}
                >
                  <Trash2 size={20} />
                </button>
              </>
            )}
          </div>
        </li>
      );
    };

    export default TodoItem;