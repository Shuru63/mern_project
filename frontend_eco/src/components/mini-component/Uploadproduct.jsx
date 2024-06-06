import React from 'react'
import './uploadproduct.css'
import { useState } from 'react'
import axios from 'axios';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from '../../Action/Productaction';
import ShowAllProduct from './ShowAllProduct';
const Uploadproduct = () => {
    const [cardVisible, setCardVisible] = useState(false)
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [categories, setCategories] = useState('');
    const [Stock, setStock] = useState(0);
    const newData = useSelector((state) => state.addNewProduct)

    const dispatch = useDispatch();
    const category = [
        "Airpodes",
        "camera",
        "Earphones",
        "mobiles",
        "mouse",
        "printer",
        "processor",
        "refrigerater",
        "Speaker",
        "Trimmers",
        "TV",
        "watches",
    ];
    const categoriesData = [
        { Category: 'Airpodes', heading: 'Airbuds' },
        { Category: 'camera', heading: ' Cameras' },
        { Category: 'Earphones', heading: ' Earphones' },
        { Category: 'mobiles', heading: ' Mobiles' },
        { Category: 'mouse', heading: 'Mice' },
        { Category: 'printer', heading: ' Printers' },
        { Category: 'processor', heading: ' Processors' },
        { Category: 'refrigerater', heading: ' Refrigerators' },
        { Category: 'Speaker', heading: ' Speakers' },
        { Category: 'Trimmers', heading: ' Trimmers' },
        { Category: 'TV', heading: ' TVs' },
        { Category: 'watches', heading: ' Watches' },
    ];
    // const createProductSubmitHandler = (e) => {
    //     e.preventDefault();
    //     const imageObjects = image.map((image, index) => ({
    //         publicId: `image_${index}`, // You can generate a unique publicId here
    //         url: image, // Assuming image is a URL or base64 data
    //     }));
    //     dispatch(addNewProduct(name, description, price, imageObjects, categories, Stock));
    //     setVisible(true);
    //     setCardVisible(false);
    //     console.log(newData)
    // }

    const createProductSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const imageObjects = [];

            for (const images of image) {
                const formData = new FormData();
                formData.append('file', images);
                formData.append('upload_preset', 'Shuru_Mern_product');

                const response = await axios.post('https://api.cloudinary.com/v1_1/di2txkpph/image/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // imageUrls.push(response.data.secure_url);
                imageObjects.push({
                    publicId: response.data.public_id,
                    url: response.data.secure_url,
                });
            }

            console.log(name, description, price, imageObjects, categories, Stock)
            dispatch(addNewProduct(name, description, price, imageObjects, categories, Stock));
            setVisible(true);
            setCardVisible(false);
        } catch (error) {
            console.error('Error uploading images to Cloudinary:', error);
        }
    }
    const handleShowProducts = () => {
        setCardVisible(true);
    };


    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    return (
        <div>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle id="LiveDemoExampleLabel">Alert</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>{newData.error}</p>
                    <p>{newData.message}</p>
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
                    <form onSubmit={createProductSubmitHandler}>
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
                                placeholder='enter Image ' onChange={createProductImagesChange} multiple />
                        </div>
                        <div className='upload-user'>
                            <label htmlFor='email'>Categories :</label>
                            <select onChange={(e) => setCategories(e.target.value)}>
                                <option value="">Choose Category</option>
                                {category.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
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
                                Upload product
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
            <div className='main-product'>
                <div className='product-cover'>
                    <div className='product-heading'>
                        <div className='allproduct-heading'>
                            <p>All product</p>
                        </div>
                        <div className='upload-btn' onClick={handleShowProducts}>
                            <button className='upload-button'>
                                Upload product
                            </button>
                        </div>

                    </div>
                    {
                                categoriesData.map((categoryItem, index) => (
                                    <ShowAllProduct 
                                        key={index}
                                        Category={categoryItem.Category}
                                        heading={categoryItem.heading}
                                    />
                                ))
                            }
                </div>
            </div>

        </div>
    )
}

export default Uploadproduct
