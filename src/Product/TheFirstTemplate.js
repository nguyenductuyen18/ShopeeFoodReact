import FooterHome from "../compoment/FooterHome";
import axios from 'axios';
import HeadHome from "../compoment/HeadHome";
import {faTags,faAngleRight,faArrowRightLong,faMagnifyingGlass, faHouse, faBriefcase, faLocationDot, faWallet, faMoneyBill, faMoneyCheckDollar, faBuildingColumns, faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/TheFirst.css';
import React, { useEffect, useState } from 'react'
export default function TheFirstTemplate(){

    const imageUrl = 'https://shopeefood.vn/app/assets/img/main-banner.jpg?45bff8c9ec408a5ba51f9fdef662324e';
    const imageIcon='https://shopeefood.vn/app/assets/img/bg-icon.png?2404d5c158d1d09104c34443b2fd5f44';
    const [shop, setShop] = useState([]);
    useEffect(() => {
        showShop();
    }, []);
    const showShop = async () => {
        const result = await axios.get("http://localhost:8080/api/shops")
        setShop(result.data);
        console.log(result.data);
    };
return (
<>
<HeadHome/>
<div className="now-banner ver_vi" style={{ backgroundImage: `url(${imageUrl})` }}>
    <div className="container-hiha">
        <div className="now-search">
            <div>
        <h1 class="title">Đặt Đồ ăn, giao hàng từ 20'...</h1>
        <div class="local">có 45944 địa điểm ở Hà Nội từ 00:00 - 23:59</div>
       </div>
        <div class="form-search">
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Tìm địa điểm, món ăn, địa chỉ..."/>
        <div class="input-group-append">
       
            <button className="mybutton" >
            <FontAwesomeIcon class="icon-search" icon={faMagnifyingGlass} />
            </button>
               
           
        </div>
    </div>
</div>
        <div className="category-list-filter">  
         <a className="haha" href="#">
         <span class="category-item">All</span>
         </a>
         <a className="haha" href="#">
         <span class="category-item">Đồ ăn</span>
         </a>
         <a className="haha" href="#">
         <span class="category-item">Đồ uống</span>
         </a>
         <a className="haha" href="#">
         <span class="category-item">Đồ chay</span>
         </a>
         <a className="haha" href="#">
         <span class="category-item">Bánh kem</span>
         </a>
         <a className="haha" href="#">
         <span class="category-item">Tráng miệng</span>
         </a>
         <a className="haha" href="#">
         <span class="category-item">Homemade</span>
         </a>
         <a className="haha" href="#">
         <span class="category-item">Vỉa hè</span>
         </a>
         <a className="haha" href="#">
         <span class="category-item">Pizza</span>
         </a>
         <a className="haha" href="#">
         <span className="category-item">Món gà</span>
         </a>
         <a className="haha" href="#">
         <span className="category-item">Món lẩu</span>
         </a>
         <a className="haha" href="#">
         <span className="category-item">Sushi</span>
         </a>
        </div>
        <div>
            <div className="font18 mb-2 mt-3">
            Sử dụng App ShopeeFood để có nhiều giảm giá 
            <br></br>
            và trải nghiệm tốt hơn
            </div>
            <a target="_blank" rel="noopener noreferrer" href="https://itunes.apple.com/us/app/deliverynow/id1137866760" title="App Store">
            <span style={{backgroundImage :`url(${imageIcon})`}} className="icon-app-store-big"></span>
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.deliverynow" title="Google play">
            <span style={{backgroundImage :`url(${imageIcon})`}} className="icon-gg-play-big"></span>
            </a>
        </div>
        </div>
        <div className="main-right-home">
        <div className="user-get-local">
            <div className="row align-items-center no-gutters pointer">
                <div className="col-auto">
                    <span class="txt-blue txt-bold">Đồ ăn</span>
                    <FontAwesomeIcon className=" ml-2 font12" icon={faArrowRightLong} />
                </div>
            <div className="col pl-2 pr-2 txt-elipsis">QL32, Đức Giang, Hoài Đức, Hoài Đức, Hà Nội</div>
            <div className="col-auto">
                <span className="pl-2 pr-2 link" data-toggle="modal">
                <FontAwesomeIcon className="txt-gray-7" icon={faAngleRight} />
                    </span>
                    </div>
             </div>
            </div>
            <div className="now-list-restaurant">
            <div className="title-wrapper">
            <h2 className="title1">Ưu đãi</h2>
            </div>
            {shop.map(item => (
            <div className="item-restaurant">
                    <a target="_blank" className="item-content" href="#">
                     <div class="img-restaurant">
                      <img className="img-small" src={`http://localhost:8080/img/${item.image}`}  alt="Sample Image from Unsplash" />
                    </div>
                    <div class="info-restaurant">
                        <div className="info-basic-res">
                            <h4 className="name-res" title={item.name}  >{item.name} - {item.idCategory.name} </h4>
                            <div className="address-res" title={item.address}>{item.address}
                                </div>
                                </div>
                                <p className="content-promotion">
                                <FontAwesomeIcon className="fas fa-tag " icon={faTags} /> Giảm món</p>
                                <div className="opentime-status">
                                    <span  className="stt online\" title="Mở cửa">
                        </span>
                        </div>
                        </div>
                        </a>
            </div>
              ))}
        </div>
        </div>
        </div>
</div>
<FooterHome/>
</>
);
}
