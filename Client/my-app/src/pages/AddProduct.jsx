import { useForm } from "react-hook-form";
import './pages.css';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useMutation } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { addProduct } from "../state/actions"; // Assuming you have this action defined

const AddProduct = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    size: '',
    category: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const sizes = [
    { value: '', text: '--Choose an option--' },
    { value: 'small', text: 'Small' },
    { value: 'large', text: 'Large' },
  ];

  const categories = [
    { value: "", text: "--Choose an option--" },
    { value: "female", text: "Female wears" },
    { value: "male", text: "Male wears" }
  ]

  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setImages([...selectedFiles]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  const uploadProduct = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('size', data.size);
      formData.append('category', data.category);

      for (let i = 0; i < data.images.length; i++) {
        formData.append(`images`, data.images[i]);
      }

      const response = await axios.post('http://localhost:5100/api/v1/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        const success = () => toast("Product and images uploaded successfully.");
        success();
        // Dispatch the action to update your Redux store
        // dispatch(addProduct(response.data.product));

        // Clear the form and images after successful submission
        setProduct({
          name: '',
          price: '',
          description: '',
          size: '',
          category: '',
        });
        setImages([]);
      } else {
        const fail = () => toast("Product was not uploaded");
        fail();
      }
    } catch (error) {
      const fail = () => toast("Product was not uploaded");
      fail();
      console.error('Error uploading product and images:', error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    uploadProduct(data);
  };

  const handleChangeSize = (event) => {
    const { value } = event.target;
    setProduct({
      ...product,
      size: value
    });
  };

  const handleChangeCategory = (event) => {
    const { value } = event.target;
    setProduct({
      ...product,
      category: value
    });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="login-box" id="add-product">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-box">
            <input
              type="text"
              {...register("name", { required: true })}
              className='form-control'
              placeholder='Enter product name'
              value={product.name}
              onChange={handleInputChange}
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="user-box">
            <select
              {...register("size", { required: true })}
              className="form-control"
              value={product.size}
              onChange={handleChangeSize}
            >
              {sizes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
            {errors.size && <span>This field is required</span>}
          </div>

          <div className="user-box">
            <select
              className="form-control"
              {...register("category", { required: true })}
              value={product.category}
              onChange={handleChangeCategory}
            >
              {
                categories.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))
              }
            </select>
            {errors.category && <span>This field is required</span>}
          </div>

          <div className="user-box">
            <input
              type="number"
              {...register("price", { required: true })}
              className='form-control'
              placeholder='Enter product price'
              value={product.price}
              onChange={handleInputChange}
            />
            {errors.price && <span>This field is required</span>}
          </div>
          <div className="user-box">
            <textarea
              {...register("description", { required: true })}
              placeholder="Enter product description"
              onChange={handleInputChange}
              value={product.description}
              className="form-control"
            />
            {errors.description && <span>This field is required</span>}
          </div>

          <div className="user-box">
            <input
              type="file"
              accept="image/*"
              multiple
              src={images}
              onChange={handleFileChange}
              {...register("images", { required: true })}
            />
            {errors.images && <span>This field is required</span>}
          </div>

          <button type="submit" className='button-1'>
            Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
