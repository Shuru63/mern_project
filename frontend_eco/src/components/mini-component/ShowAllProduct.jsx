import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdminProduct,updateProduct,deleteProduct } from '../../Action/Productaction';
import './Showproduct.css';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

const ShowAllProduct = ({ Category, heading }) => {
  const [allProductsData, setAllProductsData] = useState([]);
  const [cardVisible, setCardVisible] = useState(false)
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [categories, setCategories] = useState('');
  const [Stock, setStock] = useState(0);
  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.allProductsData);

  useEffect(() => {
    dispatch(getAllAdminProduct());
  }, [dispatch]);

  useEffect(() => {
    if (getProducts && getProducts.ourproducts && getProducts.ourproducts.data && getProducts.ourproducts.data.products) {
      setAllProductsData(getProducts.ourproducts.data.products);
    }
  }, [getProducts]);
  const handleDeleteProducts = () => {
    setVisible(true);

};
const handleUpdateProducts = () => {
  setCardVisible(true);
  
};
  return (
    <div>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        alignment='center'
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Alert</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>thdhmdm ju</p>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
                visible={cardVisible}
                onClose={() => setCardVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
                alignment='center'
                size='lg'
            >
                <CModalHeader onClose={() => setCardVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Alert</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <form >
                        <div className='upload-user'>
                            <label htmlFor='name'>Productname :</label>
                            <input type='text' placeholder='enter name of product' onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='upload-user'>
                            <label htmlFor='email'>Price :</label>
                            <input type='number' placeholder='enter Price' onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className='upload-user'>
                            <label htmlFor='email'>Product Image :</label>
                            <input type='file'
                                accept="image/*"
                                placeholder='enter Image '  multiple />
                        </div>
                        <div className='upload-user'>
                            <label htmlFor='email'>Stock :</label>
                            <input type="number"
                                placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
                        </div>

                        <div className='upload-user'>
                            <label htmlFor='email'>Description :</label>
                            <textarea type='text' placeholder='enter Description' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" className="Product_Preview" />
                            ))}
                        </div>
                        <div className='log-btn'>
                            <button type="submit" className='log-botn'>
                                Update product
                            </button>
                        </div>
                    </form>

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setCardVisible(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
      <div className='showallproduct'>
        <div className='show_cover'>
          <div className="product-head">{heading}</div>
          <div className='Single-product'>
            {allProductsData.map((product, index) => (
              <div key={index}>
                {product.categories === Category && (
                  <div className='all-product-card'>
                    <div className='allproduct-img'>
                      <img src={product.image[0].url} alt={product.name} />
                    </div>
                    <div className='allproductinfo'>
                      <h6>{product.name}</h6>
                      <spanp>Stocks: {product.stocks}</spanp>
                      <br></br>
                      <span>Price: &#8377; {product.price}</span>
                    </div>
                    
                    <div className='deleteUpdate'>
                      <div className='update_btn'onClick={handleUpdateProducts}>
                        <span class="material-symbols-outlined">
                          system_update
                        </span>
                      </div>
                      <div className='delete_btn' onClick={handleDeleteProducts}>
                        <span class="material-symbols-outlined">
                          delete
                        </span>
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
  );
}

export default ShowAllProduct;
