import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { getCategoryById } from "../Gadgets";

function CategoryDetails(){
    const {id} = useParams();
    const [category, setCategory] = useState("");

    useEffect(()=>{
        getCategoryById(id)
        .then(setCategory)
        .catch((err)=> console.error(err));

    }, [id]);

    if(!category){
        return(
            <Layout>
                <p>Loading Category details...</p>
            </Layout>
        );
    }

    return(
        <Layout>
            <h1> Category {category.categoryName}</h1>
            
            <h2>Gadgets in this category:</h2>
            {category.gadgets && category.gadgets.length > 0 ? (
                <ul>
                    {category.gadgets.map((g)=> (
                        <li key={g.gadgetId} className="border-b py-2">
                            <strong>{g.brand}</strong> - &#x20A6; {g.price}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No gadgets in this category yet.</p>
            )}
        </Layout>
    );
}
export default CategoryDetails;