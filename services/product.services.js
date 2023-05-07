const Product = require("../models/Product");

// get all product
// exports.getProductServices = async (query) => {
//   const products = await Product.find(query);
//   return products;
// };

// query by product
exports.getProductServices = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalProducts = await Product.countDocuments(filters);
  const page = Math.ceil(totalProducts / queries.limit);
  return { totalProducts, page, products };
};

exports.getProductByIdServices = async (ids) => {
  const result = await Product.findOne({ _id: ids });
  return result;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProductByIdService = async (productId, data) => {
  // increment data
  // const result = await Product.updateOne(
  //   { _id: productId },
  //   { $inc: data },
  //   {
  //     runValidators: true,
  //   }
  // );

  // one way
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    {
      runValidators: true,
    }
  );

  // two way
  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  // all product updated
  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  });

  // all product update but product data pacific chage
  // const products = [];
  // data.ids.forEach((product) => {
  //   products.push(Product.updateOne({ _id: product.id }, product.data));
  // });

  // const result = await Promise.all(products);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};
