import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../components/Fotter/Loader';
import './Product.css'
import { specificProduct } from '../../../Action/Productaction';
const Product = () => {

  const { id } = useParams();
  const [product, setProduct] = useState({})
  console.log(id)
  const dispatch = useDispatch();
  const { loading, specificData } = useSelector(state => state.specificproduct)
  const [selectedImage, setSelectedImage] = useState(''); // Initialize with the first image

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };
  console.log(product)
  useEffect(() => {
    dispatch(specificProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (specificData && specificData.data && specificData.data.singleproduct) {
      setProduct(specificData.data.singleproduct);
      console.log(specificData.data.singleproduct)
    }
    if (product.image && product.image.length > 0) {
      setSelectedImage(product.image[0].url);
    }
  }, [specificData, product]);
console.log(loading)
  return (
    <div> {loading ? (
      <Loader />
    ) : (
      <div className="product_card">
        {product && (
          <div className="product_card_details">
            <div className='responsive-card'>
              <div className='product_card_cover'>
                <div className='product_card_image'>
                  {product.image && product.image.map((image, index) => (
                    <img key={index} src={image.url} alt={product.name} onClick={() => handleImageClick(image.url)} />

                  ))}
                </div>

              </div>
              <div className='product_card_slider'>
                {selectedImage && (
                  <img src={selectedImage} alt={product.name} />
                )}

              </div>
            </div>
            <div className='product_card_info'>
              <h2>{product.name}</h2>
              <h5>{product.categories}</h5>

              <span className='price'>Price: &#8377; {product.price}</span>
              <p>
                Status :
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
              <p>
                Rating:
                <b>
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < product.Rating
                      ? 'star filled' : 'star'}>
                      &#9733;
                    </span>
                  ))}
                </b>
              </p>
              <div class="offers">
                <h4>Available Offers</h4>
                <ul>
                  <li><span class="material-symbols-outlined tag">
                    sell
                  </span>
                    <span>
                      <strong>Bank Offer:</strong> Get ₹50 instant discount on first Flipkart UPI transaction on order of ₹200 and above.
                      <a href="#UPI-TnC" target="_blank">T&amp;C</a></span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined tag">
                      sell
                    </span>
                    <span>
                      <strong>Bank Offer:</strong> 5% Cashback on Flipkart Axis Bank Card.
                      <a href="#AxisCashback-TnC" target="_blank">T&amp;C</a> </span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined tag">
                      sell
                    </span>
                    <span> <strong>Bank Offer:</strong> ₹1000 Off On Axis Bank Credit and Debit Card Transactions.
                      <a href="#AxisDiscount-TnC" target="_blank">T&amp;C</a></span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined tag">
                      sell
                    </span>
                    <span>
                      <strong>Special Price:</strong> Get extra ₹3500 off (price inclusive of cashback/coupon).
                      <a href="#SpecialPrice-TnC" target="_blank">T&amp;C</a> </span>
                  </li>
                </ul>
              </div>
              <div className='cart_button'>
                <div className='add_to_cart_btn'>
                  <button className='add_cart_btn'><span class="material-symbols-outlined">
                    shopping_cart_checkout
                  </span><span>add to cart</span></button>

                </div>
                <div className='add_to_cart_btn add_to_buy_btn'>
                  <button className='add_cart_btn'
                    disabled={product.Stock < 1 ? true : false}
                  ><span class="material-symbols-outlined">
                      flash_on
                    </span><span>Buy Now</span></button>

                </div>
              </div>
              <div className='product_description'>
                <span><b>Description : </b></span>
                <span>{product.description}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )}
    </div>
  )
}

export default Product
