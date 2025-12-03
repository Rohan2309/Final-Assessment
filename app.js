import express from "express"
import dotenv from "dotenv"
import session from "express-session"
import flash from "connect-flash"
import methodOverride from "method-override"
import path from "path"
import { fileURLToPath } from "url"
import "./app/config/db.js"
import adminRoutes from "./app/routes/adminRoutes.js"
import customerRoutes from "./app/routes/customerRoutes.js"

dotenv.config()
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.urlencoded({ extended: true }))
app.use(express.static("uploads"))
app.use(methodOverride("_method"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success = req.flash("success")[0] || null;
  res.locals.error = req.flash("error")[0] || null;
  res.locals.title = "My App"; 
  next();
});



app.use("/admin", adminRoutes)
app.use("/", customerRoutes)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
