import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdminProduct, updateProduct, deleteProduct } from '../../Action/Productaction';
import './Showproduct.css';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Loader from '../Fotter/Loader';
const ShowAllProduct = ({ Category, heading }) => {
  const [allProductsData, setAllProductsData] = useState([]);
  const [cardVisible, setCardVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [Stock, setStock] = useState(0);
  const [userid, setUserId] = useState();
  
  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.allProductsData);
  const deleteUpdate = useSelector(state => state.updateDelete);
  const {loading}=getProducts
  const handleProductUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateProduct(userid, { name, description, price, Stock }));
    window.location.reload();
  };

  const handleProductDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(userid));
    setVisible(false);
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getAllAdminProduct());
  }, [dispatch]);

  useEffect(() => {
    if (getProducts && getProducts.ourproducts && getProducts.ourproducts.data && getProducts.ourproducts.data.products) {
      setAllProductsData(getProducts.ourproducts.data.products);
    }
  }, [getProducts]);

  const handleDeleteProducts = (userId) => {
    setUserId(userId);
    setVisible(true);
    console.log(userId)
  };

  const handleUpdateProducts = (userId) => {
    setUserId(userId);
    setCardVisible(true);
    console.log(userId)
  };
  return (
    <div>
     
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
          <div className='delete_modal'>
            <p>Are you sure Delete the Product</p>
          <div className='product_delete_btn' >
             <button onClick={handleProductDelete}>delete product</button> 
          </div>
          </div>
          
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
          <form onSubmit={handleProductUpdate}>
            <div className='upload-user'>
              <label htmlFor='name'>Productname :</label>
              <input type='text' placeholder='enter name of product' onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='upload-user'>
              <label htmlFor='email'>Price :</label>
              <input type='number' placeholder='enter Price' onChange={(e) => setPrice(e.target.value)} />
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
       {loading ? (
                <Loader/>
            ) : (
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
                      <div className='update_btn' onClick={() => handleUpdateProducts(product._id)}>
                        <span class="material-symbols-outlined">
                          system_update
                        </span>
                      </div>
                      <div className='delete_btn'onClick={() => handleDeleteProducts(product._id)}> 
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
      </div>)}
      </div>
      
    </div>
  );
}

export default ShowAllProduct;
