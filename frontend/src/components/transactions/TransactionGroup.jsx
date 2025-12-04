import TransactionRowDesktop from "./TransactionRowDestop.jsx";
import TransactionRowMobile from "./TransactionRowMobile.jsx";

export default function TransactionGroup({ dateKey, items, onDelete, flag }) {
  const formattedDate =
    new Date(dateKey).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) +
    ", " +
    new Date(dateKey).toLocaleDateString("en-US", {
      weekday: "long",
    });

  return (
    <>
      {/* Date Header */}
      <div className="py-3 px-2">
        <div
          className={`flex items-center justify-start px-4 py-2 shadow-sm border-b ${
            flag ? "border-b-gray-400" : "border-b-gray-500"
          }`}
        >
          <span
            className={`text-sm font-semibold tracking-wide ${
              flag ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Rows */}
      {items.map((t) => (
        <div key={t._id}>
          <TransactionRowDesktop transaction={t} onDelete={onDelete} dateKey={dateKey} />
          <TransactionRowMobile transaction={t} onDelete={onDelete} dateKey={dateKey} />
        </div>
      ))}
    </>
  );
}
