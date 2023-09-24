import React, { useState } from 'react'
import './styles/cart.css'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, modifyCartItemQuantity, removeFromCart } from '../state/actions';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';

const Cart = () => {
  const shoppingCart = useSelector((state) => state.products.shoppingCart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const addCart = (product) => {
    const existingItem = shoppingCart.find((item) => item?._id === product?._id);


    console.log(existingItem);

    if (existingItem) {
      // If the item exists in the cart, modify its quantity
      const newQuantity = existingItem.quantity + 1;
      dispatch(modifyCartItemQuantity(existingItem._id, newQuantity));

      const updated = () => toast("Product updated");
      updated();
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const newItem = { ...product, quantity: 1, totalPrice: product?.price };
      dispatch(addToCart(newItem));
      const updated = () => toast("Product added to cart");
      updated();
    }
  };

  const handleDecreaseQuantity = (productId) => {
    // Find the cart item by product ID
    const cartItem = shoppingCart.find((item) => item._id === productId);

    if (cartItem) {
      if (cartItem.quantity === 1) {
        dispatch(removeFromCart(productId));
      } else {
        // Dispatch the modifyCartItemQuantity action to decrease the quantity
        const newQuantity = cartItem.quantity - 1;
        dispatch(modifyCartItemQuantity(productId, newQuantity));
        const updated = () => toast("Product updated");
        updated();
      }
    }
  };

  const handleDelete = (id) => {
    // setOpen(!open)
    dispatch(removeFromCart(id))
    // setOpen(false)
  }


  return (
    <>
      <section className='cart-flex'>
        {shoppingCart.length !== 0 ? shoppingCart?.map((item) => {
          return (
            <section className="cart-grid" key={item._id}>
              <div className='product-image'>
                <img src="https://assets.everspringpartners.com/fe/06/f23661be455e97d009c6ae418995/real-estate-finance.jpg" alt="" />
              </div>
              <div>
                <h4>{item?.name}</h4>
                {/* <h5>Size: M Color: Grey</h5> */}
              </div>


              <div className="product-quantity">
                <button onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                <h4>{item?.quantity}</h4>
                <button onClick={() => addCart(item)}>+</button>
              </div>
              <div>
                <h4>${item?.price}</h4>
              </div>
              <div className='delete-btn'>
                <button onClick={() => handleDelete(item._id)}>
                  <img src="https://img.icons8.com/color/96/delete-forever.png" alt="delete-forever" />
                </button>

              </div>
            </section>
          )
        }): <h3>No cart items</h3>}
      </section>

      <DeleteModal open={open} setOpen={setOpen} />
    </>
  )
}

export default Cart