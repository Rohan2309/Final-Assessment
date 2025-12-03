import express from "express"
import CustomerController from "../controllers/CustomerController.js"

const router = express.Router()
router.get("/", CustomerController.home)
router.get("/product/:slug", CustomerController.detail)

export default router
