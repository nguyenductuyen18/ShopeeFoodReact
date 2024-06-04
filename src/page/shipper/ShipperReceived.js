import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadHome from "../../compoment/HeadHome";
function ShipperReceived() {
    const [orderShip, setShipOrder] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getOrderByShip();
    }, []);

    async function getOrderByShip() {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/orderReceived`);
            setShipOrder(response.data);
            setTotalPages(Math.ceil(response.data.length / ordersPerPage));
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    async function setStatusConfirmOrder(idOrder, idStatus) {
        try {
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/${idStatus}`);
            console.log('Order status updated:', response.data);
            return getOrderByShip();

        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

  
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderShip.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <HeadHome />
            <h2 className="center">Đơn hàng của bạn</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="center">STT</th>
                        <th className="center">Mã đơn hàng</th>
                        <th>Thông tin khách hàng</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orderShip && orderShip.map((order, index) => (
                        <tr key={order.id}>
                            <td className="center">{index + 1}</td>
                            <td className="center">{order.id}</td>
                            <td>
                                {order.user.name}<br />
                                {order.user.phoneNumber}<br />
                                {order.user.address}
                            </td>
                            <td className="center">
                                <div className='button-orders'>
                                    {order.status.id === 4 && (
                                        <button onClick={() => setStatusConfirmOrder(order.id, 6)} type="button" className="btn btn-success">Bắt đầu giao hàng</button>
                                    )}
                                    {order.status.id === 6 && (
                                          <button onClick={() => setStatusConfirmOrder(order.id, 7)} type="button" className="btn btn-success">Giao thành công</button>
                                      
                                    )}
                                    {order.status.id === 7 && (
                                        <div>Đơn hàng đã giao thành công</div>
                                    )}

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </>
    );
}

export default ShipperReceived;
