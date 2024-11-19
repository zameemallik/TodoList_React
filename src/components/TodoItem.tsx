import React, { useEffect, useState } from 'react';
import { Todo, Status, Importance } from '../types';
import Button from './Button';

interface Props {
  todo: Todo;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }: Props) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [newTodo, setNewTodo] = useState<Todo>({ ...todo });
  const [statusHasChanged, setStatusHasChanged] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  // 期限（deadline）の変更を処理
  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setNewTodo((prev) => ({
      ...prev,
      deadline: new Date(selectedDate),
    }));
  };

  const handleChangeImportance = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedImportance = e.target.value as keyof typeof Importance;
    setNewTodo({ ...newTodo, importance: Importance[selectedImportance] });
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value as keyof typeof Status;
    setNewTodo({ ...newTodo, status: Status[selectedStatus] });
    setStatusHasChanged(true);
  };

  const handleUpdate = () => {
    updateTodo(newTodo);
    setIsReadOnly(true);
  };

  // ステータスが変更されたら即時に updateTodo を呼び出す
  useEffect(() => {
    if (newTodo.status !== todo.status) {
      updateTodo(newTodo);
    }
  }, [newTodo.status, todo.status, updateTodo]);

  // 親から渡されたtodoが変更されたらnewTodoに同期
  useEffect(() => {
    setNewTodo({ ...todo });
  }, [todo]);

  useEffect(() => {
    const timer = setTimeout(() => setStatusHasChanged(false), 1000); // 1秒後に戻す
    return () => clearTimeout(timer); // クリーンアップ
  }, [newTodo.status]);

  return (
    <>
      <tr className="border-b">
        {/* タイトル */}
        <td className="p-3">
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleChange}
            disabled={isReadOnly}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''} `}
          />
        </td>

        {/* 重要度 */}
        <td className="p-3">
          <select
            name="importance"
            value={Importance[newTodo.importance]}
            onChange={handleChangeImportance}
            disabled={isReadOnly}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'}`}
          >
            {Object.keys(Importance)
              .filter((key) => isNaN(Number(key)))
              .map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
          </select>
        </td>

        {/* 期限 */}
        <td className="p-3">
          <input
            type="date"
            value={
              newTodo.deadline
                ? newTodo.deadline.toISOString().split('T')[0]
                : ''
            }
            onChange={handleDeadlineChange}
            disabled={isReadOnly}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''} `}
          />
        </td>

        {/* ステータス */}
        <td className="p-3">
          <select
            name="status"
            value={Status[newTodo.status]}
            onChange={handleChangeStatus}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none cursor-pointer ${statusHasChanged ? 'bg-red-400' : ''}`}
          >
            {Object.keys(Status)
              .filter((key) => isNaN(Number(key)))
              .map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
          </select>
        </td>

        {/* 操作 */}
        <td className="p-3 text-center">
          {isReadOnly ? (
            <Button onClick={() => setIsReadOnly(false)} btnName="編集" />
          ) : (
            <Button onClick={handleUpdate} btnName="完了" />
          )}
          <Button onClick={() => deleteTodo(todo.id)} btnName="削除" />
        </td>
      </tr>

      {/* 詳細 */}
      <tr>
        <td colSpan={5} className="p-3">
          <textarea
            name="detail"
            value={newTodo.detail}
            onChange={handleChange}
            disabled={isReadOnly}
            className={`w-full p-2 border border-gray-300 rounded focus:outline-none  ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''} `}
          ></textarea>
        </td>
      </tr>
    </>
  );
};

export default TodoItem;
