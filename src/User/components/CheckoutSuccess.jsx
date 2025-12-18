
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import Center from "./Center";
import Header from "./Header";
import styled from "styled-components";
import StyledLink from "./ButtonLink";
import { useLoading } from "../LoadingContext";


const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
          @media screen and (min-width: 768px){
  grid-template-columns: 1.2fr .8fr;

}
`;
const Boxx = styled.div`
  background-color : #fff;
  border-radius: 10px;
  padding: 30px;
`;
const H1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`;

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("Saving your order...");
  const hasSaved = useRef(false);
       const {setLoading} = useLoading();
  useEffect(() => {
     setLoading(true);
    // if (!sessionId) {
    //   setStatus("No session id found in URL.");
    //   return;
    // }
    if(hasSaved.current) return;
    hasSaved.current = true;

    // 1️⃣ Read raw value from localStorage
    const raw = localStorage.getItem("pendingOrder");
    if (!raw) {
      setStatus("No order information found.");
      return;
    }

    // 2️⃣ Safely parse JSON
    let order;
    try {
      order = JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse pendingOrder from localStorage:", err, raw);
      setStatus("Order data is corrupted. Please try again or contact support.");
      return;
    }

    // 3️⃣ Prevent saving the same session twice
    const key = `order_saved_${sessionId}`;
    if (localStorage.getItem(key)) {
      console.log("Order already saved for session", sessionId);
      setStatus("Order already saved.");
      return;
    }

    function getUserId(){
      return localStorage.getItem("userId");
    }
    const userId = getUserId();

    async function saveOrder() {
      try {
        const res = await fetch(
          `https://gadgetmart.runasp.net/api/Payment/save-order?userId=${userId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              name: order.name,
              email: order.email,
              city: order.city,
              postalCode: order.postalCode,
              streetAddress: order.streetAddress,
              country: order.country,
              items: order.items, // [{ id, quantity, unitPrice }]
            }),
          }
        );


        if (!res.ok) {
          const text = await res.text();
          console.error("Save order error:", text);
          setStatus("Payment succeeded, but failed to save order.");
          return;
        }
        const data = await res.json();
        console.log("succcess", data)
        // mark this session as saved
        localStorage.setItem(key, "1");

        const storedUser = localStorage.getItem("userr");
        
        localStorage.removeItem("pendingOrder");
        localStorage.removeItem(`cart_${storedUser}`);

        setStatus("Payment successful! Your order has been saved.");
      } catch (err) {
        console.error("Save order exception:", err);
        setStatus("Payment succeeded, but error saving order.");
      }
      setLoading(false);
    }

    saveOrder();
  }, [sessionId]);

  return (
    <>  
      <Header />
      <Center>
          <ColumnWrapper>
            <Boxx>
              <H1>Thanks for your order!</H1>
              <p>{status}</p>
                <p>We will email you  when your order will be sent.</p><br />
                <StyledLink to="/user" black>Back to home page</StyledLink>
            </Boxx>
          </ColumnWrapper>
       
      </Center>
       
    </>
 
  );
}





// import { useEffect, useState, useRef } from "react";
// import { useSearchParams } from "react-router-dom";
// import Center from "./Center";
// import Header from "./Header";
// import styled from "styled-components";
// import StyledLink from "./ButtonLink";
// import { useLoading } from "../LoadingContext";

// const ColumnWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   margin-top: 40px;
// `;

// const Boxx = styled.div`
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 30px;
// `;

// const H1 = styled.h1`
//   font-size: 30px;
//   font-weight: bold;
//   color: #000;
// `;

// export default function CheckoutSuccess() {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const [status, setStatus] = useState("Finalizing your order...");
//   const hasSaved = useRef(false);
//   const { setLoading } = useLoading();

//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);

//     async function finalizeOrder() {
//       try {
//         if (!sessionId) {
//           setStatus("Payment successful.");
//           return;
//         }

//         if (hasSaved.current) return;
//         hasSaved.current = true;

//         const raw = localStorage.getItem("pendingOrder");
//         if (!raw) {
//           setStatus("Payment successful.");
//           return;
//         }

//         let order;
//         try {
//           order = JSON.parse(raw);
//         } catch {
//           setStatus("Payment successful.");
//           return;
//         }

//         const key = `order_saved_${sessionId}`;
//         if (localStorage.getItem(key)) {
//           setStatus("Order already confirmed.");
//           return;
//         }

//         const userId = localStorage.getItem("userId");
//         if (!userId) {
//           setStatus("Payment successful.");
//           return;
//         }

//         const res = await fetch(
//           `https://gadgetmart.runasp.net/api/Payment/save-order?userId=${userId}`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               sessionId,
//               ...order,
//             }),
//           }
//         );

//         if (res.ok) {
//           localStorage.setItem(key, "1");
//           localStorage.removeItem("pendingOrder");
//           localStorage.removeItem(`cart_${userId}`);
//           setStatus("Payment successful! Your order has been saved.");
//         } else {
//           setStatus("Payment successful.");
//         }
//       } catch (err) {
//         console.error("Finalize order error:", err);
//         setStatus("Payment successful.");
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     finalizeOrder();

//     return () => {
//       isMounted = false;
//     };
//   }, [sessionId, setLoading]);

//   return (
//     <>
//       <Header />
//       <Center>
//         <ColumnWrapper>
//           <Boxx>
//             <H1>Thanks for your order 🎉</H1>
//             <p>{status}</p>
//             <br />
//             <StyledLink to="/user" black>
//               Go to your account
//             </StyledLink>
//           </Boxx>
//         </ColumnWrapper>
//       </Center>
//     </>
//   );
// }