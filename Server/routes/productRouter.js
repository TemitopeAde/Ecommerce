import { Router } from "express";
import { createProduct, deleteAllProducts, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/productController.js";


const productRouter = Router();


productRouter
  .route("/")
  .get(getAllProducts)
  .post(createProduct)
  .delete(deleteAllProducts)

productRouter
  .route("/:productId")
  .delete(deleteProduct)
  .get(getProduct)
  .patch(updateProduct)
  

export default productRouter;