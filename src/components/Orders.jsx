import Layout from "./Layout";
import { useEffect, useState } from "react";

function Orders(){
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function load(){
            try{
                const res = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/GetOrders", {
                    credentials: "include",
                })
                if (!res.ok) throw new Error("Failed to fetch orders");
                const ordersData = await res.json();
                setOrders(ordersData)
            }catch(err){
                console.error("Error loading gadgets:", err);
            }finally{
                setLoading(false);
            }
        }
        load();
    }, []);
    if(loading){
        return(
            <Layout>
                <p>Loading orders...</p>
            </Layout>
        );
    }
    return(
        <Layout>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Paid</th>
                        <th>Recipient</th>
                        <th>Products</th>

                    </tr>
                </thead>
                <tbody>
                {orders.length > 0 && orders.map(order => (
                    <tr>
                        <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                        <td className={order.paid ? "text-green-600" : "text-red-600"}>{order.paid ? "YES" : "NO"}</td>
                        <td>
                            {order.customerName} {order.customerEmail} <br />
                            {order.city} {order.postalCode} {order.country}<br />
                            {order.streetAddress}
                        </td>
                        <td>
                            {order.items.map(item => (
                                <>
                                    {item.name} x {item.quantity}
                                </>
                            ))}
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </Layout>
    )
}
export default Orders;