import deleteButton from "../../assets/images/delete.png"
export default function TransactionRowDesktop({ transaction: t, onDelete, dateKey }) {
  return (
    <div
      className="hidden sm:flex text-white"
      style={{ fontSize: "clamp(0.75rem, 1vw, 1.5rem)" }}
    >
      <div className="py-3 px-6 flex-1">{t.category}</div>

      <div
        className={`py-3 px-6 flex-1 ${
          t.type === "expense" ? "text-expense" : "text-green-400"
        }`}
      >
        {t.type}
      </div>

      <div className="py-3 px-6 flex-2">{t.description}</div>

      <div className="py-3 px-6 flex-1">{dateKey}</div>

      <div
        className={`py-2 px-6 flex-1 text-end ${
          t.type === "expense" ? "text-expense" : "text-green-400"
        }`}
      >
        {t.type === "expense" ? "-" : "+"} ₹ {t.amount.toLocaleString("en-IN")}
      </div>

      <div className="py-3 px-6">
        <button
          onClick={() => onDelete(t._id)}
          className="transition-transform duration-200 hover:scale-125 cursor-pointer text-white"
        >
          <img
            className="w-4.5 opacity-80 hover:opacity-100 transition-opacity duration-200"
            src={deleteButton}
            alt="deleteButton"
          />
        </button>
      </div>
    </div>
  );
}
