import { useState, useEffect } from "react";
import { updateGadget, getAllCategories } from "../Gadgets";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout";


const EditGadget = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const existingGadget = location.state?.existingGadget;

      if (!existingGadget) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No gadget data found.</h2>
        <p>Make sure you navigated here using the edit button from the gadget list.</p>
      </div>
    );
  }
  
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState(existingGadget.brand);
    const [description, setDescription] = useState(existingGadget.description);
    const [price, setPrice] = useState(existingGadget.price);
    const [stockQuantity, setStockQuantity] = useState(existingGadget.stockQuantity);
    const [categoryId, setCategoryId] = useState(existingGadget.categoryId);
    const [images, setImages] = useState([]);
    // const navigate = useNavigate();


    useEffect(()=>{
            getAllCategories()
            .then(setCategories)
            .catch((err) => console.error("Error fetching cateories", err));
        }, []);


    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const gadgetData = {
                categoryId,
                gadgetBrand: brand,
                description,
                price,
                stockQuantity,
                images,
            };

            const res = await updateGadget(existingGadget.gadgetId, gadgetData);
            alert("Gadget updated successfully")
            navigate(`/products`);
        } catch (err) {
            console.error(err);
            alert("Error updating gadget");
        }
    };

    return(
        <Layout>
          <h1>Edit product</h1>
            <form onSubmit={handleEditSubmit}>
            <label> Product name</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" />
            <label> Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
            <label> Price (in Naira)</label>
            <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} placeholder="Price" />
            <label> StockQuantity</label>
            <input type="number" value={stockQuantity} onChange={(e)=> setStockQuantity(e.target.value)} plaeholder="StockQuantity" />
            <label>Select Category</label><br />
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((cat)=> (
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                        </option>
                    ))}

                </select><br />
            <label>Photos</label>
            <div className="mb-2 ">
                {existingGadget.imageUrls.map((url, index) => (
                  <div className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200 inline-flex">
                     <img key={index} src={url} alt={brand} width="100" height="200" className="" />

                  </div>
            ))}
            </div>
            <input type="file" multiple   className=" block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 hover:file:cursor-pointer" onChange={(e)=> setImages(Array.from(e.target.files))} />

            <button type="submit" className="btn-primary">Update Gadget</button>
        </form>
        </Layout>
   )





}
export default EditGadget;