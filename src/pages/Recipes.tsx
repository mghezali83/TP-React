import { Link } from "react-router-dom";
import usersData from "../data/users.json";

function Recipes() {
    return (
        <>
            <h1>User List</h1>
            {usersData.users.map((user) =>
                <div key={user.id}>
                    <img src={user.image} />
                    <p>
                        <Link to={`/user/${user.id}`}>
                            {user.username}
                        </Link>
                    </p>
                </div>
            )}
        </>
    )
}

export default Recipes;