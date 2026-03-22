import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    } else {
      // 1. Verify stock for all items before creating the order
      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ message: `Product not found: ${item.name}` });
        }
        if (product.countInStock < item.qty) {
          return res.status(400).json({ message: `Not enough stock for ${product.name}` });
        }
      }

      // 2. Deduct stock for all items
      for (const item of orderItems) {
        const product = await Product.findById(item.product);
        product.countInStock -= item.qty;
        await product.save();
      }

      // 3. Create the order
      const order = new Order({
        orderItems,
        user: req.user._id,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id username email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to cancel this order" });
      }
      if (order.orderStatus === "Pending") {
        order.orderStatus = "Cancelled";
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(400).json({ message: "Only pending orders can be cancelled" });
      }
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      const validStatuses = ['Pending', 'Accepted', 'Preparing', 'Completed', 'Cancelled'];
      if (validStatuses.includes(status)) {
        order.orderStatus = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(400).json({ message: "Invalid status" });
      }
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
