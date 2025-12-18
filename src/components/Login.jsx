import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    
    document.title = "Login";

    const navigate = useNavigate();

    // don't ask an already logged in user to login over and over again
    useEffect(()=>{
        const user = localStorage.getItem("user");
        if(user){
                  navigate("/");

        }
    }, []);


    return (
        <section className='login-page-wrapper page'>
            <div className='login-page'>
                <header>
                    <h1>Login Page</h1>
                </header>
                
                <p className='message'></p>
                <div className='form-holder'>
                    <form action='#' className='login' onSubmit={loginHandler}>
                        <label htmlFor='email'>Email</label>
                        <br />
                        <input type='email' name='Email' id='email' required></input> <br />

                        <label htmlFor='password'>Password</label>
                        <br />
                        <input type='password' name='Password' id='password' required></input>
                        <br />
                        <input type='checkbox' name='Remember' id='remember' required></input>
                        
                        <label htmlFor='remember'>Remember Password?</label>
                        <br />
                        <br />
                        <input type='submit' value="Login" className='login btn'></input>

                    </form>
                </div>

                <div className='my-5'>
                    <span>Or</span>
                    <a href="/register">Register</a>
                </div>

            </div>
            
        </section>
    );
    async function loginHandler(e){
        e.preventDefault();
        const form_ = e.target, submitter = document.querySelector("input.login")

        const formData = new FormData(form_, submitter), dataToSend = {};

        for(const[key, value] of formData){
            dataToSend[key] = value;
        }
        
        if(dataToSend.Remember === "on"){
            dataToSend.Remember = true;
        }
        console.log("login data before send: ", dataToSend);
        const response = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/admin-login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type" : "Application/json",
                "Accept": "application/json"
            }
        })

        const data = await response.json();

        if(response.ok){
            localStorage.setItem("user", dataToSend.Email);
           navigate("/");
        }

        const messageE1 = document.querySelector(".message")
        if(data.message){
            messageE1.innerHTML = data.message;
        }else{
            messageE1.innerHTML = "Something went wrong, please try again";
        }

        console.log("login error: ", data);
    }
    

}

export default Login;