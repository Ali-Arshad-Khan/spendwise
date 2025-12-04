import TransactionGroup from "./TransactionGroup.jsx";

export default function TransactionList({ grouped, onDelete, flag }) {
  return Object.entries(grouped).map(([dateKey, items]) => (
    <TransactionGroup
      key={dateKey}
      dateKey={dateKey}
      items={items}
      onDelete={onDelete}
      flag={flag}
    />
  ));
}
