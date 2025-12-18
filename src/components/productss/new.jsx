import Layout from "../Layout";
import { createGadget, getAllCategories } from "../Gadgets";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function NewProduct(){
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [brand, setBrand] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [stq, setStq] = useState("");
    const [images, setImages] = useState([]);

    useEffect(()=>{
        getAllCategories()
        .then(setCategories)
        .catch((err) => console.error("Error fetching cateories", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const imageUrls = images.split(",").map(i => i.trim());

        const newGadget = {
            categoryId,
            gadgetBrand: brand,
            description: desc,
            stockQuantity: stq,
            price: parseFloat(price),
            images
        }
        try{
            const res = await createGadget(newGadget);
            alert("Gadget added successfully");
            navigate(`/products`);
        }catch (err){
            console.error(err);
            alert("Error adding gadget");
        }
    };



    return(
        <Layout>
            <h1>New Product</h1>
            <form onSubmit={handleSubmit}>
                <label> Product name</label>
                <input type="text" value={brand} placeholder="product name" onChange={(e) => setBrand(e.target.value)}/>
                <label>Select Category</label><br />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map((cat)=> (
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.categoryName}
                        </option>
                    ))}

                </select><br />
                <label> Description</label>
                <textarea name="" id="" value={desc} placeholder="Description" onChange={(e) => setDesc(e.target.value)}></textarea>
                <label> Price (in Naira)</label>
                <input type="number" placeholder="price" value={price} onChange={(e) => setPrice (e.target.value)} />
                <label> StockQuantity</label>
                <input type="number" placeholder="StockQuantity" value={stq} onChange={(e) => setStq(e.target.value)} />
                <input type="file" multiple  onChange={(e) => setImages(Array.from(e.target.files))} />
                <button type="submit" className="btn-primary">Save</button>
            </form>

        </Layout>
    );
}

export default NewProduct;