import express from "express";
import {
  createDiscountCode,
  getAllDiscountCodes,
  getDiscountCodeByCode,
  updateDiscountCode,
  deleteDiscountCode,
} from "../controller/DiscountCodeController.js";

const router = express.Router();

router.post("/", createDiscountCode);
router.get("/", getAllDiscountCodes);
router.get("/:code", getDiscountCodeByCode);
router.put("/:code", updateDiscountCode);
router.delete("/:code", deleteDiscountCode);

export default router;
