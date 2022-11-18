import path from "path";
import { Router } from "express";
import multer from "multer";
import { createCategory } from "./app/useCases/categories/createCategory";
import { listcategories } from "./app/useCases/categories/listCategories";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";

export const router = Router();

// USADO PARA SALVAR IMAGENS
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads")); // __dirname é o caminho até o arquivo routes | .. serve para voltar um pasta | uploads é a pasta no qual quero salvar.
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

//LIST CATEGORIES
router.get("/categories", listcategories);

//CREATE CATEGORY
router.post("/categories", createCategory);

//LIST PRODUCTS
router.get("/products", listProducts);

//CREATE PRODUCT
router.post("/products", upload.single("image"), createProduct); // image é o nome da request que vem a imagem

//GET PRODUCTS BY CATEGORY
router.get("/categories/:categoryId/products", listProductsByCategory);

//LIST ORDERS
router.get("/orders", listOrders);

//CREATE ORDER
router.post("/orders", createOrder);

//CHANGE ORDER STATUS
router.patch("/orders/:orderId", changeOrderStatus);

//DELETE/CANCEL ORDER
router.delete("/orders/:orderId", cancelOrder);

// PUT USADO PARA ALTERAÇÃO EM TODOS OS CAMPOS DE UM MODEL
// PATCH USADO QUANDO NÃO É UMA ALTERAÇÃO EM TODOS OS CAMPOS DO MODEL
