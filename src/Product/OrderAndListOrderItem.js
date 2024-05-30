import axios from "axios";
import { useEffect, useState } from "react";
import '../css/LayoutOrederAndListOrderItem.css';
import { Link, useNavigate } from "react-router-dom";
export default function OrderAndListOrderItem() {
    const [cart, setCart] = useState([]);
    const [address,setAddress] = useState([]);
    const navigater = useNavigate();
    async function CreateOrder(e) {
        e.preventDefault()
        try {
            const orderResponse = await axios.post(`http://localhost:8080/api/order/1/1`);
            console.log('đặt hàng thành công', orderResponse.data);
            navigater('/HomeProduct')
        } catch (error) {
            console.error('Error fetching order data:', error);
            return [];
        }
    }
    async function getAddressList() {
        try {
            const response = await axios.get(`http://localhost:8080/address/1`);
            setAddress(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }

    }

    async function getOrderItem() {
        try {
            const response = await axios.get(`http://localhost:8080/api/detailCart/1/1`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }

    useEffect(() => {
        getOrderItem();
        getAddressList();
    }, []);

    function formatNumberWithCommas(number) {
        return number.toLocaleString('de-DE');
    }

    const calculateOrderTotal = (orderItems) => {
        return orderItems.reduce((total, item) => {
            return total + (item.quantity * item.product.price);
        }, 0);
    };

    return (
        <div>
            <div>Nơi nhận hàng
                {address.map((item)=>(
                    <div className="nava">
                        <div>Nơi nhận hàng : {item.address}</div>
                        <div>Số điện thoại : {item.phoneNumber}</div>
                        <div>Tên người nhận : {item.nameUser}</div>
                    </div>
                ))}
           
                <div className="nava">
                    <Link>+ Thêm nơi nhận hàng </Link>
                    
                    </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.name}</td>
                            <td>{formatNumberWithCommas(item.product.price)} đ</td>
                            <td>{item.quantity}</td>
                            <td>{formatNumberWithCommas(item.product.price * item.quantity)} đ</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="order-total">
                Tổng đơn hàng: {formatNumberWithCommas(calculateOrderTotal(cart))} đ
            </div>
            <form onSubmit={CreateOrder}>
                <button type='submit'>Thanh Toán</button>
            </form>
        </div>
    );
}
