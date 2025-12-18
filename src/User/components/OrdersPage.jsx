import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import { useContext } from "react";
import { useAuth } from "../AuthContext";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Center from "./Center";

// --- STYLES (adapt to your existing styles)
const Page = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 360px; /* left list + right empty column (you said ignore account details) */
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const OrdersList = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
`;

const OrderCard = styled.div`
  padding: 18px 0;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  gap: 12px;

  &:last-child { border-bottom: none; }
`;

const OrderLeft = styled.div`
  max-width: 65%;
`;

const OrderDate = styled.div`
  font-weight: 700;
  margin-bottom: 8px;
`;

const OrderMeta = styled.div`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.3;
`;

const OrderRight = styled.div`
  text-align: right;
  min-width: 200px;
`;

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
`;

const Item = styled.li`
  margin-bottom: 6px;
  font-weight: 600;
`;

const NoOrders = styled.div`
  padding: 40px;
  text-align: center;
  color: #666;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LogoutBtn = styled.button`
  background: #0f6b50;
  color: #fff;
  border: 0;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
`;

const Empty = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #666;
`;

function getUserId(){
  return localStorage.getItem("userId");
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);

  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchOrders();
    
  }, []);

  async function fetchOrders() {
    setLoading(true);
    setError(null);

    let userId = getUserId();

    
    if (!userId) {
      console.warn(
        "No user id found in localStorage/auth;"
      );
    
    }

   
    const url = `https://gadgetmart.runasp.net/api/gadgetmart/myorders?userId=${encodeURIComponent(
      userId
    )}`;

    try {
      const res = await fetch(url, {
        headers: {
          "Accept": "application/json",
         
        },
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed fetching orders: ${res.status} ${txt}`);
      }

      const data = await res.json();
      console.log("GET /myorders response:", data);

  
      let arr = [];
      if (Array.isArray(data)) arr = data;
      else if (data && typeof data === "object") arr = [data]; // if API returns single-order DTO
      else arr = [];

      
      setOrders(arr);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(s) {
    if (!s) return "";
    const d = new Date(s);
    return d.toLocaleString();
  }

     const handleLogout = () =>{
        logout();
        navigate("/user/login");
    }



  return (
    <>
      <Header />
      <Center>
          <Page>
        <OrdersList>
          <h2>Orders</h2>

          {loading ? (
            <div>Loading orders...</div>
          ) : error ? (
            <div style={{ color: "red", margin: 12 }}>{error}</div>
          ) : orders.length === 0 ? (
            <NoOrders>No orders found.</NoOrders>
          ) : (
            orders.map((o) => (
              <OrderCard key={o.orderId ?? o.id ?? Math.random()}>
                <OrderLeft>
                  <OrderDate>{formatDate(o.createdAt)}</OrderDate>
                  <OrderMeta>
                    {o.customerName }
                    <br />
                    { o.customerEmail }
                    <br />
                    {o.streetAddress }
                    <br />
                    {o.city }
                    <br />
                    {o.postalCode ?? ""}
                  </OrderMeta>

                  
                </OrderLeft>

                <OrderRight>
                  <ItemsList>
                    {(o.items ?? o.Items ?? []).map((it) => (
                      <Item key={ it.gadgetId}>
                        {it.quantity} x {it.name }
                      </Item>
                    ))}
                  </ItemsList>
                  <div style={{ marginTop: 12 }}>
                    
                  </div>
                </OrderRight>
              </OrderCard>
            ))
          )}
        </OrdersList>

        {/* Right column reserved (ignored account details as requested) */}
        <RightColumn>
            <div style={{ background: "#fff", padding: 20, borderRadius: 8 }}>
              <h3 style={{ marginTop: 0 }}>Account</h3>
              <p style={{ marginBottom: 12 }}>View your orders and logout.</p>
              <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
            </div>

            <div style={{ background: "#fff", padding: 16, borderRadius: 8 }}>
              <strong>Total orders:</strong>
              <div style={{ marginTop: 8, fontSize: "1.2rem" }}>{orders.length}</div>
            </div>
          </RightColumn>
        <div />
      </Page>
      </Center>
      
    </>
  );
}