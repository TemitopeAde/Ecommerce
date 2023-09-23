import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link, useNavigate } from 'react-router-dom'
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, login, searchProducts } from '../state/actions/index';
import Loader from "../components/Loader";
import { useForm } from "react-hook-form"
import 'swiper/css';
import 'swiper/css/navigation';
import { toast } from 'react-toastify';
import Toast from '../constants/Toast';
import cartImage from '../images/cart.svg';
import './styles/productcard.css';
import { getCartNumber, getCartProducts } from '../state/actions/index.js'



const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.fetchedProducts);
  const totalPages = useSelector((state) => state.products.totalPages);
  const currentPage = useSelector((state) => state.products.currentPageNumber);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("male")
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState("");
  const [load, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // console.log(products);

  useEffect(() => {
    dispatch(getCartProducts(cart))
    dispatch(getCartNumber(cartItems))
  }, [cart, cartItems, dispatch])

  useEffect(() => {
    getAllProductsMutation.mutate();
  }, [page])

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item._id === product._id);

    if (existingItem) {
      // If the item exists in the cart, increase its quantity by 1
      existingItem.quantity += 1;
      // Update the total price of the item
      existingItem.totalPrice = existingItem.quantity * existingItem.price;

      const updated = () => toast("Product updated");
      updated();
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const newItem = { ...product, quantity: 1, totalPrice: product.price };
      updatedCart.push(newItem);
      const added = () => toast("Product added to cart");
      added();
    }

    // Update the cart state
    setCart(updatedCart);


    // Calculate the cart item count and set it after updating the cart state
    const itemCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
    setCartItems(itemCount);
  };

  const getAllProductsMutation = useMutation((data) => dispatch(getAllProducts(page)), {
    onMutate: () => {
      setLoading(true)
    },

    onSuccess: (data) => {
      console.log(data, "data")
      setLoading(false)
    },

    onError: () => {
      setLoading(false)
    }
  })
  const searchMutation = useMutation((data) => dispatch(searchProducts(data)), {
    onMutate: () => {
      setLoad(true); // Set loading state to true before the mutation starts
    },

    onSuccess: (data) => {
      
      // console.log(data, "search");
      // data here is the result of the login mutation (e.g., user data)
      setLoad(false); // Set loading state to false after a successful login
      navigate("/")
    },

    // Use onError callback to handle errors
    onError: () => {
      setLoad(false); // Set loading state to false after an error
      const notify = () => toast("Product not found");
      notify();
    },
  })

  useEffect(() => {
    getAllProductsMutation.mutate();
  }, [])

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const onSubmit = (data) => {
    searchMutation.mutate(data)
  }

  const onChange = (e) => {
    searchMutation.mutate(e.target.value)
  }

  

  const pageNumbers = [];
  for (let i = Math.max(1, parseInt(currentPage) - 3); i <= Math.min(parseInt(totalPages), parseInt(currentPage) + 3); i++) {
    pageNumbers.push(i);
  }


 


  switch (loading) {
    case true:
      return <Loader />

    case false:
      return (
        <div className="container page-wrapper">
          <Toast />
          <div className="page-inner">
            <div className="search-product">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  {...register("query", { required: true })}
                  className="search-form form-control"
                  onChange={onChange}
                  placeholder='Search products by name'
                />

        
              </form>
            </div>
            <div className="product-card-container">
              {(products.length !== 0 ? products && products.map((item) => (
                <div key = {item._id}>
                  <div className="product-card">
                    <div className="product-image">
                      <Splide options={{
                        autoplay: true,
                        type: "loop",
                        lazyLoad: true,
                      }} aria-label="My Favorite Images">


                        return (
                        <SplideSlide key={item._id}>

                          <img src="https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" />

                        </SplideSlide>
                        )

                      </Splide>
                    </div>

                    <div className="product-info">
                      <h4>{item.category}</h4>
                      <Link to={`/product/${item._id}`}>
                        <h3>Crisp Spanish tortilla Matzo brei</h3>
                      </Link>

                      <div className="flex-between">
                        <button onClick={() => addToCart(item)}>
                          <img src={cartImage} alt="" />
                        </button>

                        <h5>$100</h5>
                      </div>

                    </div>
                  </div>
                </div>

              )) : <h3>No products found</h3>)}
            </div>

            <div className="products-pagination">
              {console.log(parseInt(currentPage), totalPages, "current page")}
              <ul>
                <li>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={parseInt(currentPage) === 1}
                    className={ parseInt(currentPage) === 1 ? "disabled": ""}
                  >
                    Previous
                  </button>
                </li>
                {
                  pageNumbers.map((item) => (
                    
                    <li key={item}>
                      <button
                        className={ parseInt(currentPage) === item ? "active": ""}
                        onClick={() => handlePageChange(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))
                }
                <li>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={parseInt(currentPage) === parseInt(totalPages)}
                    className={parseInt(currentPage) === parseInt(totalPages) ? "disabled" : ""}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )


    default:
      break;
  }


}

export default ProductCard