import { ExpenseCard } from "./ExpenseCard";

async function getData() {
  const res = await fetch(
    "https://devscale-mockapi.fly.dev/api/collections/expensetracker/records/",
    {
      cache: "no-cache",
    }
  );
  const data = await res.json();
  return data;
}

export const TrackerList = async () => {
  const { items } = await getData();

  return (
    <div className="space-y-4 lg:pt-4 lg:pb-8 lg:pr-4 px-4 lg:pl-0">
      {items.map((item) => {
        return <ExpenseCard item={item} />;
      })}
    </div>
  );
};
