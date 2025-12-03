import express from "express"
import AdminController from "../controllers/AdminController.js"
import CategoryController from "../controllers/CategoryController.js"
import ProductController from "../controllers/ProductController.js"
import upload from "../middlewares/multerConfig.js"

const router = express.Router()

router.get("/", AdminController.dashboard)

router.get("/categories", CategoryController.index)
router.get("/categories/create", CategoryController.create)
router.post("/categories", CategoryController.store)
router.get("/categories/:id/edit", CategoryController.edit)
router.put("/categories/:id", CategoryController.update)
router.delete("/categories/:id", CategoryController.delete)

router.get("/products", ProductController.index)
router.get("/products/create", ProductController.create)
router.post("/products", upload.single("image"), ProductController.store)
router.get("/products/:id/edit", ProductController.edit)
router.put("/products/:id", upload.single("image"), ProductController.update)
router.delete("/products/:id", ProductController.delete)

export default router
