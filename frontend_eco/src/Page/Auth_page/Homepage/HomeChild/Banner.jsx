import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../home.css'
import banner1 from "../../../../static_data/assest/assest/banner/img1.webp"
import banner2 from "../../../../static_data/assest/assest/banner/img2.webp"
import banner3 from "../../../../static_data/assest/assest/banner/img3.jpg"
import banner4 from "../../../../static_data/assest/assest/banner/img4.jpg"
import banner5 from "../../../../static_data/assest/assest/banner/img5.webp"
import mobbanner1 from "../../../../static_data/assest/assest/banner/img1_mobile.jpg"
import mobbanner2 from "../../../../static_data/assest/assest/banner/img2_mobile.webp"
import mobbanner3 from "../../../../static_data/assest/assest/banner/img3_mobile.jpg"
import mobbanner4 from "../../../../static_data/assest/assest/banner/img4_mobile.jpg"
import mobbanner5 from "../../../../static_data/assest/assest/banner/img5_mobile.png"

const Banner = () => {
    var settings_client = {
        dots: true,
        speed: 1500,
        nextArrow: null,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <div>
            <div className='slider-frame'>
            <Slider {...settings_client}>
                <div className='img-slider'>
                    <div className='img-slider-cover'>
                        <img src={banner1} className="card-img-top" alt="..." loading="lazy" />
                    </div>
                </div>
                <div className='img-slider'>
                    <div className='img-slider-cover'>
                        <img src={banner2} className="card-img-top" alt="..." loading="lazy" />
                    </div>
                </div>
                <div className='img-slider'>
                    <div className='img-slider-cover'>
                        <img src={banner3} className="card-img-top" alt="..." loading="lazy" />
                    </div>
                </div>
                <div className='img-slider'>
                    <div className='img-slider-cover'>
                        <img src={banner4} className="card-img-top" alt="..." loading="lazy" />
                    </div>
                </div>
                <div className='img-slider'>
                    <div className='img-slider-cover'>
                        <img src={banner5} className="card-img-top" alt="..." loading="lazy" />
                    </div>
                </div>
            </Slider>
            </div>
        </div>
    )
}

export default Banner
