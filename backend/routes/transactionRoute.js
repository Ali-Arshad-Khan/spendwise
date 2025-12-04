import express from "express"
import { addTransactions, getAllTransactions, deleteTransaction } from "../controllers/transactionController.js"
import { auth } from "../middleware/auth.js"

export const transactionRouter = express.Router()

transactionRouter.post('/add',auth, addTransactions)
transactionRouter.get('/',auth, getAllTransactions)
transactionRouter.delete("/:id",auth , deleteTransaction);