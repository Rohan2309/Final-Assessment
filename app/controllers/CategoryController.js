import Category from "../models/Category.js"
import { categorySchema } from "../validations/categoryValidation.js"
import slugify from "../utils/slugify.js"
import { setFlashMessage } from "../middlewares/flashMessages.js"

class CategoryController {
  async index(req, res) {
    const categories = await Category.find({ isDeleted: false })
    res.render("admin/categories", { categories })
  }
  async create(req, res) {
    res.render("admin/categoryForm", { category: {} })
  }
  async store(req, res) {
    const { error } = categorySchema.validate(req.body)
    if (error) { setFlashMessage(req,"error",error.message); return res.redirect("/admin/categories") }
    await Category.create({ name: req.body.name, slug: slugify(req.body.name) })
    setFlashMessage(req,"success","Category added")
    res.redirect("/admin/categories")
  }
  async edit(req, res) {
    const category = await Category.findById(req.params.id)
    res.render("admin/categoryForm", { category })
  }
  async update(req, res) {
    const { error } = categorySchema.validate(req.body)
    if (error) { setFlashMessage(req,"error",error.message); return res.redirect("/admin/categories") }
    await Category.findByIdAndUpdate(req.params.id, { name: req.body.name, slug: slugify(req.body.name) })
    setFlashMessage(req,"success","Category updated")
    res.redirect("/admin/categories")
  }
  async delete(req, res) { //soft delete
    await Category.findByIdAndUpdate(req.params.id, { isDeleted: true })
    setFlashMessage(req,"success","Category deleted")
    res.redirect("/admin/categories")
  }
}
export default new CategoryController()
