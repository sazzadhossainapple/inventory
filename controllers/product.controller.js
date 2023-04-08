const {
  getProductServices,
  createProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductServices();
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    //save or create
    // const product = new Product(req.body);

    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    // const result = await product.save();

    const result = await createProductService(req.body);
    // result.logger();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data is not inserted",
      error: error.message,
    });
  }
};
