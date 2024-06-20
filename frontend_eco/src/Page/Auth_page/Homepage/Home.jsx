import React from 'react'

import Banner from './HomeChild/Banner';
import './home.css'
import Categorylist from './HomeChild/Categorylist';
import Categories from './HomeChild/Categories';
import Loader from "../../../components/Fotter/Loader"

const Home = () => {
  const categoriesData = [
    { Category: 'Airpodes', heading: 'Tops Airbuds' },
    { Category: 'camera', heading: 'Top Cameras' },
    { Category: 'Earphones', heading: 'Top Earphones' },
    { Category: 'mobiles', heading: 'Top Mobiles' },
    { Category: 'mouse', heading: 'Top Mice' },
    { Category: 'printer', heading: 'Top Printers' },
    { Category: 'processor', heading: 'Top Processors' },
    { Category: 'refrigerater', heading: 'Top Refrigerators' },
    { Category: 'Speaker', heading: 'Top Speakers' },
    { Category: 'Trimmers', heading: 'Top Trimmers' },
    { Category: 'TV', heading: 'Top TVs' },
    { Category: 'watches', heading: 'Top Watches' },
  ];
  
  
  return (
    <div>
      <div className='home_page'>
        <div className='home cover'>
         <Categorylist/>
         <Banner/>
         {categoriesData.map((categoryItem, index) => (
          <Categories 
            key={index} 
            Category={categoryItem.Category} 
            heading={categoryItem.heading} 
          />
        ))}
        </div>

      </div>
    </div>
  )
}

export default Home
