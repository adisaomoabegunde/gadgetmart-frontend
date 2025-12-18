import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Button from "./Button";
import Center from "./Center";
import { CartContext } from "./CartContext";


const Page = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;


const Headerr = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin: 0;
`;

const ShowAll = styled.a`
  font-size: 14px;
  color: #2b6cb0;
  text-decoration: none;
  cursor: pointer;
`;

const ProductGriddd = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 0 10px;
  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    margin: 0;
  }
`;

const CategorySection = styled.section`
  margin-bottom: 40px;
`;

const HeadRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin: 0 10px 10px;
`;

const CatTitle = styled.h3`
  margin: 0;
  font-size: 22px;
`;

const WhiteBoxxxx = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 180px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img{
    max-width: 100%;
    max-height: 150px;
    object-fit: contain;
  }
  svg{
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 3;
  }
`;

const Titleeee = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin:0;
  display:block;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBoxxxx = styled.div`
  margin-top : 8px;
`;

const PriceRowwww= styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

const Priceeee = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  @media screen and (min-width: 768px){
  font-size: 1.1rem;

}
`;

const PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAA" +
  "AAC0lEQVR42mP8/x8AAwMCAK2f9R0AAAAASUVORK5CYII=";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoriesAndGadgets();
  }, []);

  async function fetchCategoriesAndGadgets() {
    setLoading(true);
    try {

      const res = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/GetCategory");
      const body = await res.json();
      console.log("GET /GetCategory raw response:", body);

      
      let cats = [];
      if (Array.isArray(body)) {
        cats = body;
      } else if (body && Array.isArray(body.categories)) {
        cats = body.categories;
      } else if (body && typeof body === "object") {

        const arrProp = Object.keys(body).find(k => Array.isArray(body[k]));
        cats = arrProp ? body[arrProp] : [];
      }

      
      const enriched = await Promise.all(
        cats.map(async (cat) => {
          
          if (Array.isArray(cat.gadgets) && cat.gadgets.length > 0) {
            return { ...cat, gadgets: cat.gadgets };
          }
       
          try {
            const id = cat.categoryId ?? cat.CategoryId ?? cat.id;
            if (!id) return { ...cat, gadgets: [] };

            const r = await fetch(`https://gadgetmart.runasp.net/api/gadgetmart/getcategory/${id}`);
            const b = await r.json();

            let gadgets = [];
            if (b == null) {
              gadgets = [];
            } else if (Array.isArray(b)) {
              gadgets = b;
            } else if (Array.isArray(b.gadgets)) {
              gadgets = b.gadgets;
            } else if (Array.isArray(b.Gadgets)) {
              gadgets = b.Gadgets;
            } else {
           
              const arrKey = Object.keys(b).find(k => Array.isArray(b[k]));
              gadgets = arrKey ? b[arrKey] : [];
            }

            return { ...cat, gadgets };
          } catch (err) {
            console.warn("Failed to fetch gadgets for category", cat, err);
            return { ...cat, gadgets: [] };
          }
        })
      );

      setCategories(enriched);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  // function openCategory(category) {
  //   navigate(`/user/categories/categorydetailpage/${category.categoryId}`);
  // }

  

         const {setCartProducts} = useContext(CartContext);
            function addToCart(product){
                setCartProducts(prev => [...prev, product])
        
            }

  function firstImageUrl(gadget) {
    if (!gadget) return PLACEHOLDER;
    if (Array.isArray(gadget.imageUrls) && gadget.imageUrls[0]) return gadget.imageUrls[0];
    if (Array.isArray(gadget.images) && gadget.images[0]) {
    
      if (typeof gadget.images[0] === "string") return gadget.images[0];
      if (gadget.images[0].imageUrl) return gadget.images[0].imageUrl;
    }
    if (gadget.imageUrl) return gadget.imageUrl;
    if (gadget.thumbnail) return gadget.thumbnail;
    return PLACEHOLDER;
  }

  return (
    <>
      <Header />
      <Center>
          <Page>
        <Headerr>
          <Title>Categories</Title>
      
        </Headerr>

        {loading ? (
          <div>Loading categories...</div>
        ) : (
          <>
            {categories.length === 0 && <div>No categories found.</div>}

            {categories.map((cat) => (
              <CategorySection key={cat.categoryId ?? cat.CategoryName}>
                <HeadRow>
                  <CatTitle>{cat.categoryName ?? cat.CategoryName ?? "Category"}</CatTitle>
                  <ShowAll onClick={() => openCategory(cat)}>Show all</ShowAll>
                </HeadRow>

                <ProductGriddd>
   
                  {(Array.isArray(cat.gadgets) ? cat.gadgets.slice(0, 3) : []).map((g) => (
                    <div key={g.gadgetId ?? g.id ?? JSON.stringify(g).slice(0, 40)}>
                      <WhiteBoxxxx to={`/user/products/product/ProductDetail/${g.gadgetId ?? g.id ?? ""}`}>
                        <div>
                          <img src={firstImageUrl(g)} alt={g.brand ?? g.name ?? "product"} />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                      </WhiteBoxxxx>

                      <ProductInfoBoxxxx>
                        <Titleeee to={`/user/products/product/ProductDetail/${g.gadgetId}`}>
                          {g.brand ?? g.name ?? "Unnamed gadget"}
                        </Titleeee>
                        <PriceRowwww>
                          <Priceeee>&#x20A6;{g.price ?? g.sellingPrice ?? "—"}</Priceeee>
                          <Button onClick={() => addToCart(g.gadgetId ?? g.id)} primary outline>
                            Add to cart
                          </Button>
                        </PriceRowwww>
                      </ProductInfoBoxxxx>
                    </div>
                  ))}

                 
                  <div>
                    <WhiteBoxxxx as="div"  style={{ cursor: "pointer" }}>
                      <div style={{ color: "#666" }}>
                        <div style={{ fontSize: 18, marginBottom: 6 }} > <Link to={`/user/categories/${cat.categoryId}`}>Show all</Link> →</div>
                        <div style={{ fontSize: 12 }}>{(cat.gadgets && cat.gadgets.length) ? `${cat.gadgets.length} items` : ""}</div>
                      </div>
                    </WhiteBoxxxx>
                  </div>
                </ProductGriddd>
              </CategorySection>
            ))}
          </>
        )}
      </Page>

      </Center>
    
    </>
  );
}