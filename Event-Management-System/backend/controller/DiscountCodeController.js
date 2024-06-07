import DiscountCode from "../models/DiscountModel.js";

export const createDiscountCode = async (req, res) => {
  try {
    const newDiscountCode = await DiscountCode.create(req.body);
    res.status(201).json(newDiscountCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDiscountCodes = async (req, res) => {
  try {
    const discountCodes = await DiscountCode.find();
    res.status(200).json(discountCodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDiscountCodeByCode = async (req, res) => {
  try {
    const discountCode = await DiscountCode.findOne({ code: req.params.code });
    if (!discountCode) {
      return res.status(404).json({ message: "Discount code not found" });
    }
    res.status(200).json(discountCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDiscountCode = async (req, res) => {
  try {
    const updatedDiscountCode = await DiscountCode.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      { new: true }
    );
    if (!updatedDiscountCode) {
      return res.status(404).json({ message: "Discount code not found" });
    }
    res.status(200).json(updatedDiscountCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDiscountCode = async (req, res) => {
  try {
    const deletedDiscountCode = await DiscountCode.findOneAndDelete({
      code: req.params.code,
    });
    if (!deletedDiscountCode) {
      return res.status(404).json({ message: "Discount code not found" });
    }
    res.status(200).json({ message: "Discount code deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
