import React, { useEffect, useState } from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  updateTodo,
  deleteTodo,
}: Props) => {
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Todo;
    isAsc: boolean;
  } | null>(null);

  // ソート関数: ソートキーと方向を受け取って並び替え
  const sortArray = (
    array: Todo[],
    key: keyof Todo,
    isAsc: boolean
  ): Todo[] => {
    return [...array].sort((a, b) => {
      switch (key) {
        case 'status':
          return isAsc ? a.status - b.status : b.status - a.status;
        case 'importance':
          return isAsc
            ? a.importance - b.importance
            : b.importance - a.importance;
        case 'deadline':
          const dateA = a.deadline?.getTime() || 0;
          const dateB = b.deadline?.getTime() || 0;
          return isAsc ? dateA - dateB : dateB - dateA;
        default:
          if (a[key] < b[key]) return isAsc ? -1 : 1;
          if (a[key] > b[key]) return isAsc ? 1 : -1;
          return 0;
      }
    });
  };

  // ソートの切り替え
  const handleSort = (key: keyof Todo) => {
    setSortConfig((prevConfig) => {
      const isAsc = prevConfig?.key === key ? !prevConfig.isAsc : true; // 昇順/降順を切り替え
      return { key, isAsc };
    });
  };

  // todos または sortConfig が変更されたら sortedTodos を更新
  useEffect(() => {
    if (!sortConfig) {
      setSortedTodos([...todos]);
    } else {
      const { key, isAsc } = sortConfig;
      const sorted = sortArray(todos, key, isAsc);
      setSortedTodos(sorted);
    }
  }, [todos, sortConfig]);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 border-b">
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort('title')}
            >
              タイトル {sortConfig?.key === 'title'}
            </th>
            <th
              className="p-3 text-center cursor-pointer"
              onClick={() => handleSort('importance')}
            >
              重要度 {sortConfig?.key === 'importance'}
            </th>
            <th
              className="p-3 text-center cursor-pointer"
              onClick={() => handleSort('deadline')}
            >
              期限 {sortConfig?.key === 'deadline'}
            </th>
            <th
              className="p-3 text-center cursor-pointer"
              onClick={() => handleSort('status')}
            >
              ステータス {sortConfig?.key === 'status'}
            </th>
            <th className="p-3 text-center cursor-pointer">操作</th>
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
