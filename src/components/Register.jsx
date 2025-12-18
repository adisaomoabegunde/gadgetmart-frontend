import { useEffect } from 'react';


function Register() {
    
    document.title = "Register"

    // don't ask an already registered user to register over and over again
    useEffect(()=>{
        const user = localStorage.getItem("user")
        if(user){
            document.location = "/"
        }
    },[]);


    return (
        <section className='register-page-wrapper page'>
            <div className='register-page'>
                <header>
                    <h1>Register Page</h1>
                </header>
                <p className='message'></p>
                <div className='form-holder'>
                    <form action='#' className='register' onSubmit={registerHandler}>
                         <label htmlFor='name'>Name</label>
                        <br />
                        <input type='text' name='Name' id='name' required></input> <br />

                        <label htmlFor='email'>Email</label>
                        <br />
                        <input type='email' name='Email' id='email' required></input> <br />

                        <label htmlFor='password'>Password</label>
                        <br />
                        <input type='password' name='PasswordHash' id='password' required></input>
                        <br />
                        <input type='submit' value="Register" className='register btn'></input>

                    </form>
                </div>

                <div className='my-5'>
                    <span>Or</span>
                    <a href="/login">Login</a>
                </div>
            
            </div>
            
        </section>
    );
    async function registerHandler(e){
        e.preventDefault()
        const form_ = e.target, submitter = document.querySelector("input.login");

        const formData = new FormData(form_, submitter), dataToSend = {};

        for(const[key, value] of formData){
            dataToSend[key] = value;
        }
        
        //  create username
        const newUserName = dataToSend.Name.trim().split(" ");
        dataToSend.UserName = newUserName.join("");

        const response = await fetch("https://gadgetmart.runasp.net/api/gadgetmart/register", {
            method: "POST",
            credentials: "include", 
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type" : "application/json",
                "Accept": "application/json"
            }
        });

        

        const data = await response.json();

        

        if(response.ok){
            document.location="/login";
        }

        const messageE1 = document.querySelector(".message");
        if(data.message){
            messageE1.innerHTML = data.message;
        }else{
            let errorMessages = "<div>Attention please:</div><div class='normal'>"
            data.errors.forEach(error => {
                errorMessages += error.description + " ";
            });
            errorMessages += "</div>";
            messageE1.innerHTML = errorMessages;
        }

        console.log("login error: ", data);
    }
}

export default Register;