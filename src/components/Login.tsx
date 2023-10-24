import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const handleOnClickLogin = (e) => {

        e.preventDefault;
        navigate('/admin');
    }
    return (
        <>
            <h1 className="welcome-back-text">Welcome Back Admin!</h1>
            <div className="login-box">
                <div className="login-username">
                    <span>Username</span>
                    <input type="text" placeholder="Username" />

                </div>
                <div className="login-password">
                    <span>Password</span>
                    <input type="text" placeholder="Password" />

                </div>
                <button className="login-button" onClick={handleOnClickLogin} > Login</button>
            </div>
        </>
    )
}

