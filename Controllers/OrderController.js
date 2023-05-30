import orderSchema from "../Mongo_Models/OrderSchema.js";
import User_Schema from "../Mongo_Models/User_Schema.js";
import Product_Schema from "../Mongo_Models/Product_Schema.js";

// TODO : creating a new order
export const newOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const user = await User_Schema.findById(req.user._id);
    if (req.body.wallet === true) {
      let orderAmount = user.wallet;
      orderAmount = orderAmount - totalPrice;
      req.body.wallet = orderAmount;
    } else {
      req.body.wallet = user.wallet;
    }

    const order = await orderSchema.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
    user.wallet = req.body.wallet.toFixed(2);
    await user.save();

    res.status(201).json({
      sucess: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO : getting all my orders those who are logged in
export const AllMyOrdersLogin = async (req, res) => {
  try {
    const orders = await orderSchema
      .find({ user: req.user._id })
      .populate("user", "name email");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO : getting a single orders by user
export const getSingleOrder = async (req, res) => {
  try {
    const order = await orderSchema
      .findById(req.params.orderid)
      .populate("user", "name email");
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found with the Id",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ! ======================================
// !               Admin
// ! ======================================

// TODO : All orders for admin
export const getAllOrder_Admin = async (req, res) => {
  let totalAmount = 0;
  try {
    const orders = await orderSchema.find();
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO : Function for update stocks
async function updateStock(productID, quantity) {
  const product = await Product_Schema.findById(productID);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// TODO : update status order --- Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderSchema.findById(req.params.orderid);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found with the Id",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "you have already delivered this orders",
      });
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.paymentInfo.status = "succeed";
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO : Deleting a order by admin
export const deleteOrders = async (req, res) => {
  const order = await orderSchema.findById(req.params.orderid);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order Not Found with the Id",
    });
  }

  await order.remove();
  res.status(200).json({
    success: true,
  });
};
