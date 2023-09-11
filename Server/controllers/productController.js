import Products from '../models/productModel.js'


export const createProduct = async (req, res) => {
  try {
    const { name, price, description, images, category } = req.body

    if (!name || !price || !description || !images) res.status(500).json({ msg: "Bad request" })

    const products = await Products.create({ name, price, description, images, category })
    if (!products) res.status(500).json({ err: "Products not added" })
    res.status(201).json({
      products
    })
  } catch (error) {
    res.status(500).json({ status: "error", msg: "Internal server error" })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit, category, ratings } = req.query
    const query = {}

    const lim = limit || 10
    if (category) {
      query.category = category
    }

    if (ratings) {
      query.ratings = Number(ratings)
    }

    console.log(query);



    // Count the total number of products
    const totalCount = await Products.countDocuments(query)

    // Calculate the number of pages
    const totalPages = Math.ceil(totalCount / (lim || 10))

    const products = await Products.find(query)
      .skip((page - 1) * limit)
      .limit(lim)

    if (!products) return res.status(500).json({ status: 'error', message: "No products found" });

    res.status(200)
      .json({
        products,
        page: +page,
        totalPages,
        totalCount
      })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}

export const deleteAllProducts = async (req, res) => {
  try {
    await Products.deleteMany({})
    res.status(200).json({ status: "Success", "message": "All products have been deleted" })
  } catch (error) {
    res.status(500).json({ status: "Products not deleted" })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findByIdAndDelete(productId)

    if (!product) return res.status(404).json({ status: "error", message: "Product not found" })
    res.status(200).json({ status: "success", message: "Product has been deleted" })

  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findByIdAndUpdate(productId, req.body, {
      new: true
    })

    if (!product) return res.status(404).json({ status: "error", message: "Product not found" })
    res.status(200).json({ status: "success", message: "Product has been updated" })

  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" })
  }
}

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId)
    if (!product) res.status(404).json({ status: 'error', message: 'Product not found.' });
    res.status(200).json({ product })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}