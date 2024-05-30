import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListOrderUser.css'; // Import the CSS file
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
function ListOrderUser() {
    const [orders, setOrders] = useState([]);
    const params = useParams();
    async function listOrdersByUser() {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/orders/user/${params.id}`);
            // Ensure the data is an array and log its length
            if (Array.isArray(response.data)) {
                console.log("API returned an array with length:", response.data.length);
                // Process createdAt to keep only the necessary parts
                const processedOrders = response.data.map(order => {
                    const createdAt = new Date(
                        order.createdAt[0],  // Year
                        order.createdAt[1] - 1,  // Month (0-indexed)
                        order.createdAt[2],  // Day
                        order.createdAt[3],  // Hour
                        order.createdAt[4],  // Minute
                        0,  // Seconds
                        0  // Milliseconds
                    );
                    return { ...order, createdAt };
                });
                setOrders(processedOrders);
            } else {
                console.error('API did not return an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    function formatNumberWithCommas(number) {
        return number.toLocaleString('de-DE');
    }
    useEffect(() => {
        listOrdersByUser();
    }, []);

    const calculateOrderTotal = (orderItems) => {
        return orderItems.reduce((total, item) => {
            return total + (item.quantity * item.product.price);
        }, 0);
    };
    const getStatusClassName = (statusId) => {
        switch (statusId) {
            case 1:
                return 'status-yellow';
            case 2:
                return 'status-green';
            case 3:
          
                return 'status-red-bold';
            default:
                return '';
        }
    };
    

    return (
        <div className="order-container">
            <div style={{ textAlign: 'left' }}>
                <Link
                    to="/HomeProduct"
                    style={{
                        display: 'inline-block',
                        width: '100px',
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '3px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        margin: '10px 0'
                    }}
                >
                    Quay lại
                </Link>
            </div>
            {orders.map((order) => (
                <div key={order.id} className="order-card">
                    <div className="order-header">
                        <div className="order-time">Thời gian đặt hàng: {moment(order.createdAt).format('YYYY-MM-DD HH:mm')}</div>
                    </div>
                    <div className="order-status">
                         <span className={`status-container ${getStatusClassName(order.status.id)}`}>{order.status.type}</span>
                    </div>
                    <div className="order-items">
                        {order.orderItems.map((item) => (
                            <div key={item.id} className="order-item">
                                <div className='detail-restaurant-imgs'><img src={`http://localhost:8080/img/${item.product.image}`} /></div>
                                <div className="item-name">Tên món: {item.product.name}</div>
                                <div className="item-quantity">Số lượng: {item.quantity}</div>
                                <div className="item-price">Giá: {formatNumberWithCommas(item.product.price)} đ</div>
                                <div className="item-total">Thành tiền: {formatNumberWithCommas(item.quantity * item.product.price)} đ</div>
                            </div>
                        ))}
                    </div>
                    <div className="order-total">Tổng đơn hàng: {formatNumberWithCommas(calculateOrderTotal(order.orderItems))} đ</div>


                </div>
            ))}
        </div>
    );
}

export default ListOrderUser;
