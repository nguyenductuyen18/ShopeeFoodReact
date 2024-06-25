import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListOrderShop.css'; // Import the CSS file
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
function ListOrderShop() {
    const [orders, setOrders] = useState([]);
    const params = useParams();

    async function updateStatus(idOrder, statusId) {
        try {
            console.log("Updating order status for order ID:", idOrder, "with status ID:", statusId);
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/${statusId}`);
            console.log('Order status updated:', response.data);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }
    function formatNumberWithCommas(number) {
        return number.toLocaleString('de-DE');
}

    async function listOrdersByUser() {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/orders/shop/${params.id}`);
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

    useEffect(() => {
        listOrdersByUser();
    }, []);

    const calculateOrderTotal = (orderItems) => {
        return orderItems.reduce((total, item) => {
            return total + (item.quantity * item.product.price);
        }, 0);
    };
    

    return (
        <div className="order-container">
            <div style={{ textAlign: 'left' }}>
                <Link
                    to={`/detailShop/${params.id}`}
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
                    <div className="order-items">
                        <table class="table">
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Tên món</th>
                                <th>Só lượng hàng</th>
                                <th>Đơn giá</th>
                                <th>Thông tin khách hàng</th>
                                <th>Thàng tiền</th>
                            </tr>
                        {order.orderItems.map((item) => (
                        
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.product.name}</td>
                                <td>{formatNumberWithCommas(item.quantity)}</td>
                                <td>{formatNumberWithCommas(item.product.price)}</td>
                                    <td>
                                    <span className='detailUser'>{order.user.name}</span>
                                        {/* <span>{order.idUser.address}</span><br /> */}
                                        <span>{order.user.phoneNumber}</span>
                                    </td>
                                <td>{formatNumberWithCommas(item.product.price * item.quantity)}</td>
                                </tr>
                        ))}
                        </table>
                    </div>
                    <div className="order-total">Tổng đơn hàng: {formatNumberWithCommas(calculateOrderTotal(order.orderItems))} đ</div>
                    <div className="order-status">
                        {/* <span>{order.status.type}</span> */}
                        {order.status.id === 1 ? (
                            <>
                                <button className="confirm-button" onClick={() => { console.log("Xác nhận button clicked."); updateStatus(order.id, 2); }}>Xác nhận</button>
                                <button className="cancel-button" onClick={() => { console.log("Hủy đơn button clicked."); updateStatus(order.id, 3); }}>Hủy đơn</button>
                            </>
                        ) : order.status.id === 2 ? (
                                <button className="waiting-button">Chờ giao hàng</button>
                        ) : null}
                    </div>


                </div>
            ))}
        </div>
    );
}

export default ListOrderShop;
