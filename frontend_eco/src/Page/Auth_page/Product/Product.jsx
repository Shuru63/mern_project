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
      <span key={index} className={index <product.Rating
        ? 'star filled' : 'star'}>
        &#9733;
      </span>
    ))}
  </b>
</p>
              <div className='cart_button'>
                <div className='add_to_cart_btn'>
                  <button className=''>add to cart</button>

                </div>
                <div className='add_to_cart_btn add_to_buy_btn'>
                  <button className=''
                    disabled={product.Stock < 1 ? true : false}
                  >Buy Now</button>

                </div>
              </div>
              <div className=''>
                <p>{product.description}</p>
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
