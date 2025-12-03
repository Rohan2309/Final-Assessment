import Product from "../models/Product.js"
import Category from "../models/Category.js"

class CustomerController {
  async home(req, res) {
    const { category, search } = req.query

    let query = { isDeleted: false }
    if (category) query.category = category
    if (search) query.name = new RegExp(search, "i")

    const products = await Product.find(query).populate("category")
    const categories = await Category.find({ isDeleted: false })

    res.render("customer/index", { 
      title: "Customer Portal",  
      products, 
      categories,
      category: category || "",  
      search: search || ""       
    })
  }

  async detail(req, res) {
    const product = await Product.findOne({ slug: req.params.slug }).populate("category")
    res.render("customer/productDetail", { 
      title: product?.name || "Product Detail", 
      product 
    })
  }
}

export default new CustomerController()
