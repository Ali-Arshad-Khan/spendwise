import TransactionGroup from "./TransactionGroup.jsx";

export default function ExpenseList({ groupedExpense, onDelete, flag }) {
  return Object.entries(groupedExpense).map(([dateKey, items]) => (
    <TransactionGroup
      key={dateKey}
      dateKey={dateKey}
      items={items}
      onDelete={onDelete}
      flag={flag}
    />
  ));
}
