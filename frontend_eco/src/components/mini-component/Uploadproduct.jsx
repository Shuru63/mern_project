import React from 'react'
import './uploadproduct.css'
const Uploadproduct = () => {
    return (
        <div>
            <div className='main-product'>
                <div className='product-cover'>
                   <div className='product-heading'>
                    <div className='allproduct-heading'>
                        <p>All product</p>
                    </div>
                    <div className='upload-btn'>
                         <button className='upload-button'>
                            Upload product
                         </button>
                    </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Uploadproduct
