import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../components/Fotter/Loader';
import { getAllProduct } from '../../../../Action/Productaction'
const Categories = ({ Category, heading }) => {
    const [allProductsData, setAllProductsData] = useState([]);

    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.allProductsData);
    const { loading, error, allUserData } =getProducts
    console.log(loading)
    useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    useEffect(() => {
        if (getProducts && getProducts.ourproducts && getProducts.ourproducts.data && getProducts.ourproducts.data.products) {
            setAllProductsData(getProducts.ourproducts.data.products);
        }
    }, [getProducts]);
    return (
        <div> {loading ? (
            <Loader/>
         ) : (
            <div className='home_category_list'>
                <div className='home_category_cover'>
                    <div className='home_category_list_heading'>
                        <h4>{heading}</h4>
                        <div className='home_Single-product'>
                            {allProductsData
                                .filter(product => product.categories === Category)
                                .slice(0, 4).map((product, index) => (
                                    <div key={index}>
                                        {product.categories === Category && (
                                            <div className='home_all-product-card'>
                                                <Link className="product_link" to={`/product/${product._id}`} > 
                                                  <div className='home_allproduct-img'>
                                                    <img src={product.image[0].url} alt={product.name} />
                                                </div></Link>
                                                <div className='home_allproductinfo'>
                                                <Link className="product_link" to={`/product/${product._id}`} >
                                                 <div className='home_allproductinfo'>
                                                    <h6>{product.name}</h6>
                                                    <span>{product.categories}</span>
                                                    <br></br>
                                                    <span>Price: &#8377; {product.price}</span>
                                                  </div> 
                                                   </Link>
                                                <div className='add_to_cart_btn'>
                                                    <button className=''>add to cart</button>
                                                </div>
                                                </div>
                                            </div>
                                       
                                )}
                        </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>)}
        </div >
    )
}

export default Categories
