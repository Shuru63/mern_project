import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProduct } from '../../../Action/Productaction';
const CategoryProductpage = () => {
    const { category} = useParams();
   console.log(category)
   const [allProductsData, setAllProductsData] = useState([]);

    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.allProductsData);

    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    useEffect(() => {
        if (getProducts && getProducts.ourproducts && getProducts.ourproducts.data && getProducts.ourproducts.data.products) {
            setAllProductsData(getProducts.ourproducts.data.products);
        }
    }, [getProducts]);
    console.log(getProducts)
  return (
    <div>
          <div className='home_category_list'>
                <div className='home_category_cover'>
                    <div className='home_category_list_heading'>
                        <h4>{category}</h4>
                        <div className='home_Single-product'>
                            {allProductsData
                            .filter(product => product.categories === category)
                            .map((product, index) => (
                                <div key={index}>
                                    {product.categories === category && (
                                       <Link  className="product_link" to={`/product/${product._id}`} > <div className='home_all-product-card'>
                                            <div className='home_allproduct-img'>
                                                <img src={product.image[0].url} alt={product.name} />
                                            </div>
                                            <div className='home_allproductinfo'>
                                                <h6>{product.name}</h6>
                                                <span>{product.categories}</span>
                                                <br></br>
                                                <span>Price: &#8377; {product.price}</span>
                                                <div className='add_to_cart_btn'>
                                                    <button className=''>add to cart</button>
                                                </div>
                                            </div>
                                        </div></Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CategoryProductpage
