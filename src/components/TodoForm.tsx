import React, { useState } from 'react';
import { Importance, Status } from '../types';
import Button from './Button';

interface Props {
  addTodo: (
    title: string,
    detail: string,
    status: Status,
    deadline: Date,
    importance: number
  ) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }: Props) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [status, setStatus] = useState<Status>(Status.未着手);
  const [deadline, setDeadLine] = useState<Date>(new Date());
  const [importance, setImportance] = useState<Importance>(Importance.底);

  const handleSubmit = () => {
    console.log('現在の重要度');
    console.log(Importance[importance]);
    addTodo(title, detail, status, deadline, importance);
    setTitle('');
    setDetail('');
    setStatus(Status.未着手);
    setDeadLine(new Date());
    setImportance(Importance.低);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        TODO追加フォーム
      </h2>

      {/* タイトル入力 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* ステータス選択 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          ステータス
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(Number(e.target.value) as Status)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value={Status.未着手}>未着手</option>
          <option value={Status.進行中}>進行中</option>
          <option value={Status.完了}>完了</option>
        </select>
      </div>

      {/* 期限入力 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">期限</label>
        <input
          type="date"
          value={deadline.toISOString().split('T')[0]}
          onChange={(e) => setDeadLine(new Date(e.target.value))}
          placeholder="期限"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 重要度選択 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">重要度</label>
        <select
          value={importance}
          onChange={(e) => setImportance(Number(e.target.value) as Importance)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value={Importance.高}>高</option>
          <option value={Importance.中}>中</option>
          <option value={Importance.低}>低</option>
        </select>
      </div>

      {/* 詳細入力 */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">詳細</label>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="詳細"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 追加ボタン */}
      <div className="text-center">
        <Button onClick={handleSubmit} btnName="追加" />
      </div>
    </div>
  );
};

export default TodoForm;
