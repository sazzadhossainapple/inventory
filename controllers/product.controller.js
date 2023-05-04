const {
  getProductServices,
  createProductService,
  bulkUpdateProductService,
  updateProductByIdService,
  deleteProductByIdService,
  bulkDeleteProductService,
  getProductByIdServices,
} = require("../services/product.services");

// get all product
// exports.getProducts = async (req, res, next) => {
//   try {
//     const products = await getProductServices({});
//     res.status(200).json({
//       status: "success",
//       data: products,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "can't get the data",
//       error: error.message,
//     });
//   }
// };

// query by prodduct
exports.getProducts = async (req, res, next) => {
  try {
    const filters = { ...req.query };

    // sort, page, limit, -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    const products = await getProductServices(filters, queries);
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

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getProductByIdServices(id);

    res.status(200).json({
      status: "success",
      message: "Data get by successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the product",
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

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Data update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "Data update successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};
exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Could't delete the product",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    res.status(200).json({
      status: "success",
      message: "Data all deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};
