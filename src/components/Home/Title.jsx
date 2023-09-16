"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NewExpenseForm } from "../ExpenseTracker/NewExpenseForm";

export const Title = () => {
  const [newExpense, setNewExpense] = useState(false);
  const cancelExpense = () => setNewExpense(false);
  const addExpense = () => setNewExpense(true);

  return (
    <div className="lg:h-screen lg:max-w-lg flex flex-col items-between justify-between lg:mx-auto lg:py-4 p-4 gap-10">
      <div className="text-sm text-slate-400">
        <Link href="https://www.asrafilll.com">About Me</Link>
      </div>
      {newExpense ? (
        <NewExpenseForm cancelAdd={cancelExpense} />
      ) : (
        <div className="flex flex-col gap-6 transition">
          <h1 className="text-5xl lg:text-6xl">
            Your Daily{" "}
            <Image
              src="/assets/wallet.png"
              width={72}
              height={72}
              className="inline w-8 lg:w-12"
            />
            <br />
            Expense Tracker
          </h1>

          <button
            onClick={addExpense}
            className="px-4 py-3 bg-blue-500 rounded-lg w-fit"
          >
            <div className="text-sm text-white">Add New Expense</div>
          </button>
        </div>
      )}
      <div className="hidden lg:block">
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/fluency/96/github.png"
          alt="github"
        />
      </div>
    </div>
  );
};
