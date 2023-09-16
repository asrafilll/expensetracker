"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const NewExpenseForm = ({ cancelAdd }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const clearData = () => {
    setTitle("");
    setDescription("");
    setAmount();
  };

  async function createExpense() {
    const res = await fetch(
      "https://devscale-mockapi.fly.dev/api/collections/expensetracker/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          category: "expense",
          amount: amount,
        }),
      }
    );
    const result = await res.json();
    clearData();
    cancelAdd();
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-sm text-slate-700">Title</div>
        <input
          value={title}
          className="border-[1px] focus:outline-none p-2 w-full rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <div className="text-sm text-slate-700">Description</div>
        <input
          value={description}
          className="border-[1px] focus:outline-none p-2 w-full  rounded-lg"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm text-slate-700">Amount (in number)</div>
        <input
          value={amount}
          className="border-[1px] focus:outline-none p-2 w-full rounded-lg"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex gap-8">
        <button
          onClick={createExpense}
          className="px-8 py-3 bg-blue-500 rounded-lg w-fit"
        >
          <div className="text-sm text-white"> Submit</div>
        </button>
        <button onClick={cancelAdd} className="rounded-lg w-fit">
          <div className="text-sm text-slate-600"> Cancel</div>
        </button>
      </div>
    </div>
  );
};
