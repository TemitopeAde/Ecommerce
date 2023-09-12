import { Router } from "express";
import { createProduct, deleteAllProducts, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const productRouter = Router();


productRouter.get(getAllProducts)
productRouter.post("/", upload.array('images', 5), createProduct)
productRouter.delete("/", deleteAllProducts)

productRouter.delete("/:productId", deleteProduct)
productRouter.get("/:productId",  getProduct)
productRouter.patch("/:productId", updateProduct)
  

export default productRouter;