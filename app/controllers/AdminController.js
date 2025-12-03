import Category from "../models/Category.js"
import Product from "../models/Product.js"

class AdminController {
  async dashboard(req, res) {
    const categories = await Category.countDocuments({ isDeleted: false })
    const products = await Product.countDocuments({ isDeleted: false })
    res.render("admin/dashboard", { categories, products })
  }
}
export default new AdminController()
