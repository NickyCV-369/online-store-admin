import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi lấy sản phẩm' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json({ message: 'Thêm sản phẩm thành công', product: saved });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Lỗi thêm sản phẩm' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json({ message: 'Cập nhật sản phẩm thành công', product: updated });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Lỗi cập nhật sản phẩm' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Lỗi xóa sản phẩm' });
  }
};

export const updateProductStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });

    if (product.stock + quantity < 0) {
      return res.status(400).json({ error: 'Không đủ tồn kho' });
    }

    product.stock += quantity;
    await product.save();

    res.status(200).json({ message: 'Cập nhật tồn kho thành công', product });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};