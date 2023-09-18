import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom'
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux'
import { getAllProducts } from '../state/actions/index';
import Loader from "../components/Loader";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { toast } from 'react-toastify';
import Toast from '../constants/Toast';
import cartImage from '../images/cart.svg';
import './styles/productcard.css';
import { getCartNumber, getCartProducts } from '../state/actions/index.js'



const ProductCard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [products, setProduct] = useState({})
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState("");

  useEffect(() => {
    dispatch(getCartProducts(cart))
    dispatch(getCartNumber(cartItems))
  }, [cart, cartItems, dispatch])


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


  console.log(cartItems);

  const getAllProductsMutation = useMutation((data) => dispatch(getAllProducts()), {
    onMutate: () => {
      setLoading(true)
    },

    onSuccess: (data) => {
      setProduct(data)
      setLoading(false)
    },

    onError: () => {
      setLoading(false)
    }
  })

  useEffect(() => {
    getAllProductsMutation.mutate();
  }, [])

  switch (loading) {
    case true:
      return <Loader />

    case false:
      return (
        <div className="container page-wrapper">
          <Toast />
          <div className="page-inner">
            <div className="product-card-container">
              {
                products?.products.map((item) => (
                  <div className="product-card" key={item._id}>
                    
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
                ))
              }
            </div>
          </div>
        </div>
      )


    default:
      break;
  }


}

export default ProductCard