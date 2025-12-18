
import Header from "./Header";
import { CartContext } from "./CartContext";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import { getGadgetById } from "../../components/Gadgets";
import Table from "./Table";
import Input from "./Input";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
    gap: 40px;
  margin: 40px 20px;
          @media screen and (min-width: 768px){
  grid-template-columns: 1.2fr .8fr;
  margin: 40px 0;
}`;
const Box = styled.div`
  background-color : #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, .1);
`;
const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding:5px;
  border: 1px solid rgba(0,0,0, .1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 80px;
    max-height: 80px;
  }
`;
const QuantityLabel = styled.span`
  padding: 0 3px;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

function CartPage(){
  // IMPORTANT: do NOT wrap page with CartContextProvider here.
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [gadgets, setGadget] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  // Address / order fields (optional)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');

  useEffect(()=>{
    if(!cartProducts || cartProducts.length === 0){
      setGadget([]);
      return;
    }
    async function loadItems() {
      try{
        const items = [];
        // fetch each gadget details (you already have getGadgetById)
        for(const id of cartProducts){
              console.log("Fetching gadget ID:", id);

          const data = await getGadgetById(id);
               console.log("API response for", id, data)

          items.push(data);
        }
        setGadget(items);
      }catch(error){
        console.error("Error loading cart items:", error);
      }
    }
    loadItems();
  }, [cartProducts]);

  // unique ids and utility functions
  const uniqueIds = [...new Set(cartProducts.map(id => id))];

  function moreOfThisProducts(id){
    addProduct(id);
  }
  function lessOfThisProduct(id){
    removeProduct(id);
  }

  // total in Naira (your prices are in Naira)
  let totalNaira = 0;
  for(const id of cartProducts){
    const price = gadgets.find(g => g.gadgetId === id)?.price || 0;
    totalNaira += price;
  }

  // === STRIPE CHECKOUT HANDLER ===
  // Build line_items and POST to backend to create checkout session
 async function handleCheckout() {
  if (
    !name.trim() ||
    !email.trim() ||
    !city.trim() ||
    !postalCode.trim() ||
    !streetAddress.trim() ||
    !country.trim()
  ) {
    alert("Please fill in all order details before checking out.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    alert("Please enter a valid email address.");
    return;
  }

  try {

    const grouped = cartProducts.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    const checkoutItems = Object.entries(grouped).map(([id, quantity])=> {
      const g = gadgets.find(x => x.gadgetId === parseInt(id));
          return {
                  id: g.gadgetId,
                  name: g.brand,
                  unitPrice: g.price * 100,
                  quantity: quantity,
                  image: g.imageUrls[0]
          };
    });
    localStorage.setItem(
      "pendingOrder",
      JSON.stringify({
        items : checkoutItems,
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
      })
    );
    // console.log("Checkout Items:", checkoutItems);

    const response = await fetch("https://gadgetmart.runasp.net/api/Payment/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: checkoutItems,
        successUrl: "https://localhost:5173/user/success",
        cancelUrl: "https://localhost:5173/user/cancel"
      })
    });


    const data = await response.json();

    if (!response.ok) {
      console.error("Backend error:", data);
      alert("Payment failed.");
      return;
    }

    if (data.url) {
      window.location.href = data.url;
    }

  } catch (error) {
    console.error("Checkout error:", error);
  }
}

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>

            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}

            {cartProducts?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueIds.map(id => {
                    const g = gadgets.find(item => item.gadgetId === id);
                    const quantity = cartProducts.filter(x => x === id).length;
                    if(!g) return null;
                    return (
                      <tr key={id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={g.imageUrls?.[0] ?? "/images/no-image.png"} alt={g.brand} />
                          </ProductImageBox>
                          {g.brand}
                        </ProductInfoCell>
                        <td>
                          <Button onClick={()=> lessOfThisProduct(id)}> - </Button>
                          <QuantityLabel>{quantity}</QuantityLabel>
                          <Button onClick={()=> moreOfThisProducts(id)}>+</Button>
                        </td>
                        <td>&#x20A6;{quantity * g.price}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>&#x20A6;{totalNaira}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <Input value={name} onChange={e => setName(e.target.value)} type="text" required placeholder="Name" />
              <Input value={email} onChange={e => setEmail(e.target.value)} type="text" required placeholder="Email" />
              <CityHolder>
                <Input value={city} onChange={e => setCity(e.target.value)} type="text" required placeholder="City" />
                <Input value={postalCode} onChange={e => setPostalCode(e.target.value)} required type="text" placeholder="Postal Code" />
              </CityHolder>
              <Input value={streetAddress} onChange={e => setStreetAddress(e.target.value)} required type="text" placeholder="Address" />
              <Input value={country} onChange={e => setCountry(e.target.value)} type="text" required placeholder="Country" />

              <Button black block onClick={handleCheckout} disabled={loadingCheckout}>
                {loadingCheckout ? "Redirecting to payment..." : `Continue to payment (₦${totalNaira})`}
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
export default CartPage;