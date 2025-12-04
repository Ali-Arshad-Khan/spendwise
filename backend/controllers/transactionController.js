import Transaction from "../transactionModel.js";

// ➕ Add Transaction (only for logged-in user)
export async function addTransactions(req, res) {
  try {
    // 🔒 Check if the user is logged in
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    // 🧩 Create a new transaction for the logged-in user
    const newTransaction = new Transaction({
      ...req.body,
      user: req.session.userId, // Attach user's ID from session
    });

    await newTransaction.save();

    res.status(201).json({ message: "Expense saved successfully!" });
  } catch (err) {
    console.error("Error saving transaction:", err);
    res.status(400).json({ error: err.message });
  }
}

// 🗑 Delete Transaction (only logged-in user + only their own transaction)
export async function deleteTransaction(req, res) {
  try {
    // Check login
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    const { id } = req.params; // transaction ID from URL

    // Check if the transaction exists AND belongs to the logged-in user
    const deleted = await Transaction.findOneAndDelete({
      _id: id,
      user: req.session.userId
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Transaction not found or you are not allowed to delete it"
      });
    }

    res.status(200).json({ message: "Transaction deleted successfully!" });

  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: err.message });
  }
}


// 📋 Get All Transactions (only for logged-in user)
export async function getAllTransactions(req, res) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    const transactions = await Transaction.find({ user: req.session.userId });

    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: err.message });
  }
}
