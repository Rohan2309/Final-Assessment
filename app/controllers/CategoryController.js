import Category from "../models/Category.js";
import { categorySchema } from "../validations/categoryValidation.js";
import slugify from "../utils/slugify.js";
import { setFlashMessage } from "../middlewares/flashMessages.js";

class CategoryController {
  // 🔹 Show all categories
  async index(req, res) {
    try {
      const categories = await Category.find({ isDeleted: false }).sort({ createdAt: -1 });
      res.render("admin/categories", { categories });
    } catch (error) {
      console.error(error);
      setFlashMessage(req, "error", "Something went wrong");
      res.redirect("/admin");
    }
  }

  // 🔹 Render create form
  async create(req, res) {
    res.render("admin/categoryForm", { category: {} });
  }

  // 🔹 Create category (with unique slug fix)
  async store(req, res) {
    try {
      // Validate
      const { error } = categorySchema.validate(req.body);
      if (error) {
        setFlashMessage(req, "error", error.message);
        return res.redirect("/admin/categories");
      }

      const name = req.body.name.trim();
      let slug = slugify(name);

      // Check for duplicate slug
      let exists = await Category.findOne({ slug });
      if (exists) {
        slug = slug + "-" + Math.floor(Math.random() * 10000);
      }

      await Category.create({ name, slug });

      setFlashMessage(req, "success", "Category added successfully");
      res.redirect("/admin/categories");
    } catch (error) {
      console.error(error);
      setFlashMessage(req, "error", "Unable to create category");
      res.redirect("/admin/categories");
    }
  }

  // 🔹 Render edit form
  async edit(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        setFlashMessage(req, "error", "Category not found");
        return res.redirect("/admin/categories");
      }
      res.render("admin/categoryForm", { category });
    } catch (error) {
      console.error(error);
      setFlashMessage(req, "error", "Something went wrong");
      res.redirect("/admin/categories");
    }
  }

  // 🔹 Update category (with unique slug fix)
  async update(req, res) {
    try {
      const { error } = categorySchema.validate(req.body);
      if (error) {
        setFlashMessage(req, "error", error.message);
        return res.redirect("/admin/categories");
      }

      const name = req.body.name.trim();
      let slug = slugify(name);

      // Check duplicate slug except current category
      let exists = await Category.findOne({
        slug,
        _id: { $ne: req.params.id }
      });

      if (exists) {
        slug = slug + "-" + Math.floor(Math.random() * 10000);
      }

      await Category.findByIdAndUpdate(req.params.id, { name, slug });

      setFlashMessage(req, "success", "Category updated successfully");
      res.redirect("/admin/categories");
    } catch (error) {
      console.error(error);
      setFlashMessage(req, "error", "Unable to update category");
      res.redirect("/admin/categories");
    }
  }

  // 🔹 Soft delete category
  async delete(req, res) {
    try {
      await Category.findByIdAndUpdate(req.params.id, { isDeleted: true });
      setFlashMessage(req, "success", "Category deleted successfully");
      res.redirect("/admin/categories");
    } catch (error) {
      console.error(error);
      setFlashMessage(req, "error", "Unable to delete category");
      res.redirect("/admin/categories");
    }
  }
}

export default new CategoryController();
