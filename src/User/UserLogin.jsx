import { useState, useContext } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import { apiFetch } from "../components/Gadgets";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./LoadingContext";

export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

    const {setLoading} = useLoading();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  setLoading(true);


    try {
      const data = await apiFetch("/UserLogin", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // backend should return { token, user }

      console.log("Loin response:", data);
      const userData = data.user ?? data;
      const token = data.tooken ?? data?.tooken;
      const userId = data.userId ?? data;
      login(userData, token, userId);
      navigate("/user");
      alert("Login successfully");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
   <section className='login-page-wrapper page'>
            <div className='login-page'>
                <header>
                    <h1>Login Page</h1>
                </header>
                
                <p className='message'></p>
                <div className='form-holder'>
                    <form action='#' className='login' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Email</label>
                        <br />
                        <input type='email' name='Email' id='email' required onChange={(e)=> setEmail(e.target.value)}></input> <br />

                        <label htmlFor='password'>Password</label>
                        <br />
                        <input type='password' name='Password' id='password' required onChange={(e)=> setPassword(e.target.value)}></input>
                        <br />
                        <br />
                        <input type='submit' value="Login" className='login btn'></input>

                    </form>
                </div>

                <div className='my-5'>
                    <span>Or</span>
                    <a href="/user/register">Register</a>
                </div>

            </div>
            
        </section>
  );
}