import React from 'react'
import { Link } from 'react-router-dom'

import './styles/productcard.css'

const ProductCard = () => {
  return (
    <div className="container page-wrapper">
      <div className="page-inner">
        <div className="row">
          <div className="el-wrapper">
            <div className="box-up">
              <img className="img" src="http://code.slicecrowd.com/labs/4/images/t-shirt.png" alt="" />
                <div className="img-info">
                  <div className="info-inner">
                    <span className="p-name">I feel like Pablo</span>
                    <span className="p-company">Yeezy</span>
                  </div>
                  <div className="a-size">Available sizes : <span className="size">S , M , L , XL</span></div>
                </div>
            </div>

            <div className="box-down">
              <div className="h-bg">
                <div className="h-bg-inner"></div>
              </div>

              <Link to="/" className="cart">
                <span className="price">$120</span>
                <span className="add-to-cart">
                  <span className="txt">Add in cart</span>
                </span>
              </Link>
            </div>
          </div>
          
        </div>
        <div className="row">
          <div className="el-wrapper">
            <div className="box-up">
              <img className="img" src="http://code.slicecrowd.com/labs/4/images/t-shirt.png" alt="" />
              <div className="img-info">
                <div className="info-inner">
                  <span className="p-name">I feel like Pablo</span>
                  <span className="p-company">Yeezy</span>
                </div>
                <div className="a-size">Available sizes : <span className="size">S , M , L , XL</span></div>
              </div>
            </div>

            <div className="box-down">
              <div className="h-bg">
                <div className="h-bg-inner"></div>
              </div>

              <Link to="/" className="cart">
                <span className="price">$120</span>
                <span className="add-to-cart">
                  <span className="txt">Add in cart</span>
                </span>
              </Link>
            </div>
          </div>

        </div>
        <div className="row">
          <div className="el-wrapper">
            <div className="box-up">
              <img className="img" src="http://code.slicecrowd.com/labs/4/images/t-shirt.png" alt="" />
              <div className="img-info">
                <div className="info-inner">
                  <span className="p-name">I feel like Pablo</span>
                  <span className="p-company">Yeezy</span>
                </div>
                <div className="a-size">Available sizes : <span className="size">S , M , L , XL</span></div>
              </div>
            </div>

            <div className="box-down">
              <div className="h-bg">
                <div className="h-bg-inner"></div>
              </div>

              <Link to="/" className="cart">
                <span className="price">$120</span>
                <span className="add-to-cart">
                  <span className="txt">Add in cart</span>
                </span>
              </Link>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="el-wrapper">
            <div className="box-up">
              <img className="img" src="http://code.slicecrowd.com/labs/4/images/t-shirt.png" alt="" />
              <div className="img-info">
                <div className="info-inner">
                  <span className="p-name">I feel like Pablo</span>
                  <span className="p-company">Yeezy</span>
                </div>
                <div className="a-size">Available sizes : <span className="size">S , M , L , XL</span></div>
              </div>
            </div>

            <div className="box-down">
              <div className="h-bg">
                <div className="h-bg-inner"></div>
              </div>

              <Link to="/" className="cart">
                <span className="price">$120</span>
                <span className="add-to-cart">
                  <span className="txt">Add in cart</span>
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductCard