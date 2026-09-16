import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
            />

            <button>Login</button>
        </>
    );
}

export default Login;