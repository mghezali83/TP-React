import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../store/reducers/auth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    async function login() {
        try {
            const response = await axios.post(
                "https://dummyjson.com/auth/login",
                {
                    username: username,
                    password: password,
                }
            );

            localStorage.setItem("token", response.data.accessToken);

            dispatch(setLoggedUser(response.data));

            setMessage("Login success");
        } catch {
            setMessage("Login fail");
        }
    }

    return (
        <>
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>Login</button>

            <p>{message}</p>
        </>
    );
}

export default Login;