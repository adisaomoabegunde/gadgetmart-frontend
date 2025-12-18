import { useEffect, useState } from "react";
import Layout from "./Layout";
import { createCategory, deleteCategory, getAllCategories } from "./Gadgets";
import { Link } from "react-router-dom";

function Categories(){
    const [categories, setCategories]= useState([]);
    const [loading, setLoading] = useState(true);
    const [newCatgory, setNewCategory] = useState("");

    useEffect(()=>{
        getAllCategories()
        .then((data) => {
            console.log("Api response:", data);
            setCategories(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
            setLoading(false);
        });
    }, []);

    if(loading){
        return (
            <Layout>
                <p>Loading categories...</p>
            </Layout>
        );
    }

    const handleAddCategory = async (e)=>{
        e.preventDefault();
        if(!newCatgory.trim()) return alert("Enter a category name");

        try {
            await createCategory(newCatgory);
            alert("Category added successfully!");
            setNewCategory("");
            
        } catch (err) {
            console.error(err);
            alert("Failed to add category");
        }
    };

    const handleDelete = async (id)=>{
        if(!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await deleteCategory(id);
            alert("Category deleted successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to delete category");
        }
    };


    return(
       <div className="min-h-screen ">
             <Layout>
           <h1>Categories</h1>
           <label> New Category name</label>
           <form onSubmit={handleAddCategory} className="flex flex-col gap-1 mb-4 sm:flex-row ">
                <input type="text" value={newCatgory} onChange={(e)=> setNewCategory(e.target.value)} className="mb-0" placeholder="Category name" />
                <button type="submit" className="btn btn-primary  py-1">Save</button>

           </form>

            {categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
               <div className=" overflow-x-auto">
                 <table className="basic mt-2 ">
                    <thead>
                        <tr>
                            <th >Category Id</th>
                            <th>Category name</th>
                            <th>View Category</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat)=>(
                            <tr key={cat.categoryId}>
                                <td >{cat.categoryId}</td>
                                <td>{cat.categoryName}</td>
                                <td>
                                    <Link className="btn btn-primary" to={`/productss/CategoryDetails/${cat.categoryId}`}>
                                        view
                                    </Link>
                                </td>
                                <td><button className="bg-red-700 rounded-md text-white text-sm px-2 py-1 inline-flex gap-1" onClick={()=> handleDelete(cat.categoryId)}>Delete</button></td>

                            </tr>
                        ))}

                    </tbody>
                </table>
               </div>
            )}
        </Layout>
       </div>
    );



}
export default Categories;