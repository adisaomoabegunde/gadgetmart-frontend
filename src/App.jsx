import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import './App.css';
import ProtectedRoutes from './ProtectedRoutes';
import Register from './components/Register';
import Admin from './components/Admin';
import Login from './components/Login.Jsx';
import Home from './components/Home';
import Products from './components/products';
import New from './components/productss/new';
import EditGadget from './components/productss/EditGadget';
import Categories from './components/categories';
import CategoryDetails from './components/productss/CategoryDetails';
import Header from './User/components/Header';
import UserProtectedRoute from './UserProtectedRoute';
import HomePage from './User/components/HomePage';
import { createGlobalStyle } from 'styled-components';
import { CartContextProvider } from './User/components/CartContext';
import CartPage from './User/components/cart';
import CheckoutSuccess from './User/components/CheckoutSuccess';
import Orders from './components/Orders';
import UserProducts from './User/components/UserProducts';
import ProductPage from './User/components/product/ProductDetail';
import RegisterUser from './User/Register';
import LoginUser from './User/Login';
import RequireAuth from './User/RequireAuth';
import { AuthProvider } from './User/AuthContext';
import AuthWrapper from './AuthWrapper';
import AdminReuireAuth from './AdminRequireAuth';
import Search from './User/components/Search';
import CategoriesPage from './User/components/CategoriesPage';
import CategoryDetailPage from './User/components/CategoryDetailPage';
import OrdersPage from './User/components/OrdersPage';



// ✅ Create the router correctly
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ADMIN + BACKEND ROUTES */}
      <Route path="/" element={<AdminReuireAuth />}>
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="products" element={<Products />} />
        <Route path="productss/new" element={<New />} />
        <Route path="productss/EditGadget/:id" element={<EditGadget />} />
        <Route path="categories" element={<Categories />} />
        <Route path="productss/CategoryDetails/:id" element={<CategoryDetails />} />
        <Route path='/orders' element={<Orders/>}/>
      </Route>

      {/* PUBLIC ROUTES */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />


        
      
      {/* USER SECTION */}
      <Route path="/user" element={<AuthWrapper />}>
            <Route path='cancel' element={<div>Payment cancelled</div>} />
            <Route path='products' element={<UserProducts/>}/>
            <Route path='products/product/ProductDetail/:id' element={<ProductPage/>} />
            <Route path='/user/search' element={<Search/>}/>
            <Route path='/user/categories' element={<CategoriesPage/>}/>      
            <Route path='/user/categories/:id' element={<CategoryDetailPage/>} />
            <Route path='/user/account' element={<OrdersPage/>}/>
            
        <Route element={ <RequireAuth />} >
            <Route index element={<HomePage />} />

            <Route path='success'  element={ <CheckoutSuccess />  } />
            <Route path='cart' element={<CartPage/>} />

        </Route>
            <Route path='register' element={<RegisterUser/>}/>
            <Route path='login' element={<LoginUser/>}/>
      </Route>
            
      
      {/* 404 PAGE */}
      <Route
        path="*"
        element={
          <div>
            <header>
              <h1>Not found</h1>
            </header>
            <p>
              <a href="/">Back to Home</a>
            </p>
          </div>
        }
      />
    </>
  )
);

function App() {
  const isLogged = localStorage.getItem("user");

  const logout = async () => {
    const response = await fetch("https://localhost:7030/api/gadgetmart/logout", {
      method: "GET",
      credentials: "include"
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.removeItem("user");
      alert(data.message);
      document.location = "/login";
    } else {
      console.log("Could not logout.", response);
    }
  };

  return (
    <section>
      <div className="top-nav">
        {/* You can uncomment this block if needed */}
        {/* {isLogged ? (
          <span className="item-holder">
            <span onClick={logout}>Log out</span>
          </span>
        ) : (
          <span className="item-holder">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </span>
        )} */}
      </div>

      {/* ✅ RouterProvider must be here */}
      <AuthProvider>
      <RouterProvider router={router} />
          
      </AuthProvider>
    </section>
  );
}

export default App;