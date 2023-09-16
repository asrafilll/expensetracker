"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const ExpenseCard = ({ item }) => {
  const amount = item.amount.toLocaleString("en-US");
  const isExpense = item.category === "expense";
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const router = useRouter();

  const clearData = () => {
    setTitle("");
    setDescription("");
    setEditAmount();
  };

  async function deleteExpense() {
    const res = await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/expensetracker/records/${item.id}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  }

  async function editExpense() {
    const res = await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/expensetracker/records/${item.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          category: "expense",
          amount: editAmount,
        }),
      }
    );
    const result = await res.json();
    console.log(result);
    setIsEditing(false);
    router.refresh();
  }

  return (
    <div
      className={`flex justify-between items-center lg:py-6 lg:px-8 lg:rounded-3xl py-4 px-2 rounded-xl min-h-[100px] lg:min-h-[120px] ${
        isExpense ? "bg-rose-50" : "bg-emerald-50"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full p-1 bg-white">
          {isExpense ? (
            <Image src="/assets/expense.png" width={48} height={48} />
          ) : (
            <Image src="/assets/income.png" width={48} height={48} />
          )}
        </div>
        <div>
          {isEditing ? (
            <div className="flex flex-col gap-1">
              <input
                value={title || item.title}
                className=" focus:outline-none p-1 w-24 lg:w-fit rounded-lg text-sm"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                value={description || item.description}
                className=" focus:outline-none p-1 w-24 lg:w-fit rounded-lg text-sm"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <div className="text-md lg:text-xl text-slate-800">
                {item.title}
              </div>
              <div className="text-xs lg:text-sm text-slate-400">
                {item.description}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 lg:gap-4 items-center">
        {isEditing ? (
          <input
            value={editAmount}
            className="focus:outline-none p-1 rounded-lg text-right text-sm w-24 lg:w-fit"
            type="number"
            onChange={(e) => setEditAmount(e.target.value)}
          />
        ) : (
          <div className="text-base lg:text-2xl text-slate-600">Rp{amount}</div>
        )}

        {isEditing ? (
          <div className="flex space-x-2">
            <button onClick={editExpense} className="bg-white p-2 rounded-full">
              <img
                width="16"
                height="16"
                src="https://img.icons8.com/color/48/ok--v1.png"
                alt="ok--v1"
              />
            </button>
            <button
              onClick={() => {
                clearData();
                setIsEditing(false);
              }}
              className="bg-white p-2 rounded-full"
            >
              <img
                width="16"
                height="16"
                src="https://img.icons8.com/color/48/cancel--v1.png"
                alt="cancel--v1"
              />
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="bg-white p-2 rounded-full"
            >
              <img
                width="16"
                height="16"
                src="https://img.icons8.com/cotton/64/edit--v1.png"
                alt="edit--v1"
              />
            </button>
            <button
              onClick={deleteExpense}
              className="bg-white p-2 rounded-full"
            >
              <img
                width="16"
                height="16"
                src="https://img.icons8.com/color/48/000000/trash--v1.png"
                alt="trash--v1"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
