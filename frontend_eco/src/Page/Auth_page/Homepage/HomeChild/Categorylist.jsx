import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../../../Action/Productaction';
import '../home.css'
const Categorylist = () => {
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
  const getOneProductPerCategory = (products) => {
    const categoryMap = new Map();

    for (const product of products) {
      if (!categoryMap.has(product.categories)) {
        categoryMap.set(product.categories, product);
      }
    }

    return Array.from(categoryMap.values());
  };
  const uniqueCategoryProducts = getOneProductPerCategory(allProductsData);
  return (
    <div>
      <div className='product_icon'>
        <div className='product_icon_cover'>
          {uniqueCategoryProducts.map((product, index) => (
            <Link className="product_link" to={`categoryproductpage/${product.categories}`} >
               <div key={index}>
              <div className='product_icon-card'>
                <span className='product_icon-img'>
                  <img src={product.image[0].url} alt={product.name} />
                </span>
              </div>
            </div></Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categorylist
