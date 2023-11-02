import { FormEvent, SyntheticEvent, useState, useRef } from "react";
import AdminPanel from "../admin";

export default function Login() {

    const formRef = useRef<HTMLFormElement | null>(null); // Create a ref for the form

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleOnClickLogin = (e: SyntheticEvent) => {

        setIsUserLoggedIn(!isUserLoggedIn)
        if (isUserLoggedIn)
            console.log("logged in");

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const uname = formData.get('username');
            const password = formData.get('password');

            console.log("uname, password: ", uname, password);
        }



    }
    return (
        <>
            {!isUserLoggedIn && <>


                <h1 className="welcome-back-text">Welcome Back Admin!</h1>
                <form method="post" >
                    <div className="login-box">
                        <div className="login-username">
                            <span>Username</span>
                            <input type="text" name="username" onChange={handleInputChange} value={formData.username} placeholder="Username" />

                        </div>
                        <div className="login-password">
                            <span>Password</span>
                            <input type="text" name="password" onChange={handleInputChange} value={formData.password} placeholder="Password" />

                        </div>
                        <button type="submit" className="login-button" onClick={handleOnClickLogin} > Login</button>
                    </div>
                </form>
            </>}
            {isUserLoggedIn && <AdminPanel />}
        </>
    )
}

