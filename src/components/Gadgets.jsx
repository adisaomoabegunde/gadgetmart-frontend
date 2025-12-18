
// Fetch all gadgets

export async function getAllGadgets(){
    const res = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/getGadget")
    // .then(res => res.json())
    // .then(data => setGadgets(data));
    if (!res.ok) throw new Error("Failed to fetch gadgets");
    return res.json();
}
// Fetch gadget by Id
export async function getGadgetById(id){
    const res = await fetch(`https://gadgetmart.runasp.net/api/gadgetmart/getgadget/${id}`);
    if (!res.ok) throw new Error("Gadget not found");
    return res.json();
}

// Create a new gadget with images
export async function createGadget(gadgetData){
    const formData = new FormData();
    formData.append("CategoryId", gadgetData.categoryId);
    formData.append("Brand", gadgetData.gadgetBrand);
    formData.append("Description", gadgetData.description);
    formData.append("StockQuantity", gadgetData.stockQuantity);
    formData.append("Price", gadgetData.price);


    if(gadgetData.images && gadgetData.images.length > 0){
        
    for(let i = 0; i < gadgetData.images.length; i++){
        formData.append("ImageUrls", gadgetData.images[i]);
    }
    }
    for(let pair of formData.entries()){
        console.log(pair[0], pair[1]);
    }
    

    const res = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/insertgadget", {
        method: "POST",
        // headers: {"Content-Type": "application/json"},
        body: formData,
    });
    if(!res.ok) throw new Error("Failed to add new gadget");
    return res.json();
}

export async function updateGadget(id, gadgetData){
    const formData = new FormData();
    formData.append("CategoryId", gadgetData.categoryId);
    formData.append("Brand", gadgetData.gadgetBrand);
    formData.append("Description", gadgetData.description);
    formData.append("Price", gadgetData.price);

    if (gadgetData.images && gadgetData.images.length > 0){
        for (let i = 0; i < gadgetData.images.length; i++){
            formData.append("ImageUrls", gadgetData.images[i]);
        }
    }

    const res = await fetch(`https://gadgetmart.runasp.net/api/gadgetmart/Updategadget/${id}`, {
        method: "PUT",
        body: formData,
    });
    if(!res.ok) throw new Error("Failed to update gadget");
    return res.json();

}

export async function deleteGadget(id){
    const res = await fetch(`https://gadgetmart.runasp.net/api/gadgetmart/Deletegadget/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete gadget");
    return res.json();
}

export async function getAllCategories(){
    const res = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/GetCategory");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

export async function getCategoryById(id){
    const res = await fetch(`https://gadgetmart.runasp.net/api/gadgetmart/getcategory/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch category with id ${id}`);
    return res.json();
}
export async function createCategory(categoryName){
    const res = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/InsertCategory", {
        method: "POST",
        headers:{
            "content-Type": "application/json",
        },
        body: JSON.stringify({categoryName}),
    });
    if (!res.ok) throw new Error("Failed to add category");
    return await res.json();
}

export async function deleteCategory(categoryId){
    const res = await fetch(`https://gadgetmart.runasp.net/api/gadgetmart/DeleteCategory/${categoryId}`, {
        method: "DELETE",
    });
    if(!res.ok) throw new Error("Failed to delete category");
    return await res.json();
}
export const getAdminStats = async ()=> {
    const res = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/GetStats");
    return res.json();
}
const BASE_URL = "https://gadgetmart.runasp.net/api/gadgetmart";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
}