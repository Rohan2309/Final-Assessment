# 🛒 Product Management System

A simple **Product Listing Portal** built with **Node.js, Express, MongoDB, and EJS**.  
The system provides two portals:

- **Admin Panel (/admin)** – Manage Categories & Products (CRUD with Soft Delete).
- **Customer Portal (/)** – View and search products by category or keyword.

This project follows the **MVC architecture** and includes **file uploads (Multer), form validation (Joi), soft delete, and flash messages**.

---

## 🚀 Features

### 👩‍💼 Admin Panel (`/admin`)
1. **Dashboard (`/admin`)**
   - View total number of products
   - View total number of categories
   - Navigation to Category and Product Management

2. **Category Management (`/admin/categories`)**
   - Fields: `name`, `slug` (auto-generated), `isDeleted` (soft delete)
   - Add new category
   - Edit existing category
   - Soft delete categories (not removed from DB)

3. **Product Management (`/admin/products`)**
   - Fields: `name`, `slug` (auto-generated), `category`, `description`, `image`, `isDeleted`
   - List products with name, category, image
   - Add new product with validation
   - Edit product (update details and image)
   - Delete product (soft delete + remove image from uploads folder)
   - Flash messages for Add/Edit/Delete actions

---

### 🛍️ Customer Portal (`/`)
1. **Homepage**
   - Display all active products
   - Filter products by category
   - Search by product name or description

2. **Product Detail Page (`/product/:slug` or `/product/:id`)**
   - Show product name
   - Show category name
   - Full description
   - Product image

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **EJS** (templating engine)
- **Bootstrap** (UI styling)
- **Multer** (image uploads)
- **Joi** (form validation)
- **Express-Flash & Connect-Flash** (flash messages)
- **Nodemon** (development server)




