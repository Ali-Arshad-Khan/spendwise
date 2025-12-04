import TransactionGroup from "./TransactionGroup.jsx";

export default function IncomeList({ groupedIncome, onDelete, flag }) {
  return Object.entries(groupedIncome).map(([dateKey, items]) => (
    <TransactionGroup
      key={dateKey}
      dateKey={dateKey}
      items={items}
      onDelete={onDelete}
      flag={flag}
    />
  ));
}
