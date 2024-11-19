import React, { useState } from 'react';
import { Todo, Status, Importance } from './types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // フォームの表示状態

  // TODOの追加
  const addTodo = (
    title: string,
    detail: string,
    status: Status,
    deadline: Date,
    importance: Importance
  ) => {
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      detail,
      status,
      deadline,
      importance,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setIsFormVisible(false); // フォームを閉じる
  };

  // TODOの更新
  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  // TODOの削除
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl relative">
        <h1 className="text-2xl font-bold text-center mb-6">TODOリスト</h1>
        {/* 右上の追加ボタン */}
        <button
          onClick={() => setIsFormVisible(true)}
          className="absolute top-20 right-10 bg-blue-500 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-blue-600"
        >
          +
        </button>
        {/* TODOリストの表示 */}
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </div>

      {/* ポップアップ表示 */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-screen-md w-full">
            <TodoForm addTodo={addTodo} />
            <button
              onClick={() => setIsFormVisible(false)} // フォームを閉じる
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
