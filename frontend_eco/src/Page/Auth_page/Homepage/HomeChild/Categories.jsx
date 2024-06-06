import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../../../Action/Productaction'
const Categories = ({ Category, heading }) => {
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
    return (
        <div>
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
                                        </div>
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

export default Categories
