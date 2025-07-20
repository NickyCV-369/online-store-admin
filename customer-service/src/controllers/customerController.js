import Customer from '../models/customer.js';

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi lấy danh sách khách hàng' });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const saved = await customer.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Lỗi thêm khách hàng' });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Lỗi cập nhật khách hàng' });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    res.json({ message: 'Đã xóa khách hàng' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Lỗi xóa khách hàng' });
  }
};
