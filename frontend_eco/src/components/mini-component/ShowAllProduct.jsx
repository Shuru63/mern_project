import React from 'react'
import './Showproduct.css'
import { useEffect,useState } from 'react'
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from '../../Action/Productaction';
const ShowAllProduct = () => {
    const dispatch = useDispatch();
    // const products = useSelector(state => state.allProductsData);
    const { products, loading } = useSelector(state => state.allProductsData);
    
    
    useEffect(() => {
        dispatch(getAllProduct());
        console.log(products)
    }, [dispatch]);
  return (
    <div>
      <div className='showallproduct'>
        <div className='show_cover'>
           <div className='Single-product'>
            <p>hello</p>
            <div className='all-product-card'>
                <div className='allproduct-img'>

                </div>
                <div className='allproductinfo'>
                    
                </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAllProduct

