import express from "express";
import { createOrder, getMyOrders, getAllOrders, cancelOrder, updateOrderStatus } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, admin, getAllOrders);
router.get("/myorders", protect, getMyOrders);
router.put("/:id/cancel", protect, cancelOrder);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
