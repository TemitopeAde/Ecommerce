import React from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import "./styles/Header.css"

const Header = () => {
  const cartNumber = useSelector(state => state.products.cartProducts)

  console.log(cartNumber);
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Your Logo</Link>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/signin">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item cart">
              <button>
                <img src="https://img.icons8.com/ios/50/shopping-bag--v1.png" alt="shopping-bag--v1" />
              </button>
              {cartNumber && <span className="cart-count">{cartNumber.length}</span>}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
