import Product from "../models/Product.js"
import Category from "../models/Category.js"
import { productSchema } from "../validations/productValidation.js"
import slugify from "../utils/slugify.js"
import fs from "fs"
import { setFlashMessage } from "../middlewares/flashMessages.js"

class ProductController {
  async index(req, res) {
    const products = await Product.find({ isDeleted: false }).populate("category")
    res.render("admin/products", { products })
  }
  async create(req, res) {
    const categories = await Category.find({ isDeleted: false })
    res.render("admin/productForm", { product:{}, categories })
  }
  async store(req, res) {
    const { error } = productSchema.validate(req.body)
    if (error) { setFlashMessage(req,"error",error.message); return res.redirect("/admin/products") }
    await Product.create({ ...req.body, slug: slugify(req.body.name), image: req.file.filename })
    setFlashMessage(req,"success","Product added")
    res.redirect("/admin/products")
  }
  async edit(req, res) {
    const product = await Product.findById(req.params.id)
    const categories = await Category.find({ isDeleted: false })
    res.render("admin/productForm", { product, categories })
  }
  async update(req, res) {
    const { error } = productSchema.validate(req.body)
    if (error) { setFlashMessage(req,"error",error.message); return res.redirect("/admin/products") }
    const product = await Product.findById(req.params.id)
    let updateData = { ...req.body, slug: slugify(req.body.name) }
    if (req.file) {
      fs.unlinkSync("uploads/" + product.image)
      updateData.image = req.file.filename
    }
    await Product.findByIdAndUpdate(req.params.id, updateData)
    setFlashMessage(req,"success","Product updated")
    res.redirect("/admin/products")
  }
  async delete(req, res) { // soft delete
    const product = await Product.findById(req.params.id)
    fs.unlinkSync("uploads/" + product.image)
    await Product.findByIdAndUpdate(req.params.id, { isDeleted: true })
    setFlashMessage(req,"success","Product deleted")
    res.redirect("/admin/products")
  }
}
export default new ProductController()
