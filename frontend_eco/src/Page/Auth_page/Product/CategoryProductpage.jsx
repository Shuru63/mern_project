import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Product.css'
import Loader from '../../../components/Fotter/Loader';
import { getAllProduct } from '../../../Action/Productaction';
const CategoryProductpage = () => {
    const { category } = useParams();

    const [allProductsData, setAllProductsData] = useState([]);
   
    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.allProductsData);
 const { loading, error, allUserData } =getProducts
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
             {loading ? (
            <Loader/>
         ) : (
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
                                            <Link className="product_link" to={`/product/${product._id}`} >
                                                <div className='category_all-product-card'>
                                                    <div className='category_allproduct-img'>
                                                        <img src={product.image[0].url} alt={product.name} />
                                                    </div>
                                                    <div className='home_allproductinfo'>
                                                        <h6>{product.name}</h6>
                                                        <span>{product.categories}</span>
                                                        <br></br>
                                                        <p className='catrating'>
                                                            <span className="categories-rating">
                                                                {product.Rating}  &#9733;
                                                            </span>
                                                            <span className="categories-stocks">
                                                                ({product.stocks})</span>

                                                        </p>
                                                        <span className='cat-price'><b>&#8377; {product.price}</b> </span>
                                                    </div>
                                                </div></Link>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default CategoryProductpage
