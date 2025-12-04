import { useState } from "react";
import arrowDown from "../../assets/images/icons/arrowdown.png";

export default function TransactionRowMobile({ transaction: t, onDelete, dateKey }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex sm:hidden justify-around items-center flex-col mb-5">
      {/* Main row */}
      <div
        onClick={() => setOpen(!open)}
        className={`flex justify-center items-center w-full mb-2 pr-4 rounded-lg ${
          t.type === "expense" ? "border-red-950" : "border-green-950"
        }`}
      >
        <div className="flex-2">
          <div className="pt-2 pb-1 px-6 flex-1">{t.category}</div>
          <div className="pb-2 px-6 flex-2 text-[12px] text-gray-300">{t.description}</div>
          <div className="pb-2 px-6 flex-1 text-[10px] text-gray-300">{dateKey}</div>
        </div>

        <div
          className={`py-2 px-6 flex-1 text-end ${
            t.type === "expense" ? "text-expense" : "text-green-400"
          }`}
        >
          {t.type === "expense" ? "-" : "+"} ₹ {t.amount.toLocaleString("en-IN")}
        </div>

        <div className="w-5 flex justify-center items-center">
          <button className="cursor-pointer">
            <img src={arrowDown} alt="" />
          </button>
        </div>
      </div>

      {/* Delete button */}
      {open && (
        <div
          className="flex justify-between rounded-lg w-full px-4 h-10 
                     transition-all duration-300 animate-squeezeIn"
        >
          <button
            onClick={() => onDelete(t._id)}
            className="transition-transform duration-200 hover:scale-125 cursor-pointer bg-red-600 text-white px-6 rounded-lg w-full"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
