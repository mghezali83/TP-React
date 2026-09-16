import { useState } from "react";
import usersData from "../data/users.json";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        let user = usersData.users.find((user) => {
            return user.username === username && user.password === password;
        });

        if (user) {
            navigate(`/profile/${user.id}`);
        }
        else {
            setError("Identifiant ou mot de passe incorrect");
        }
    }

    return (
        <>
            <div className="login">
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

                <button onClick={handleLogin}>Login</button>

                {error && <p>{error}</p>}
            </div>
        </>
    );
}

export default Login;