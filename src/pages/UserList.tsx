import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function UserList() {
    const users = useSelector((state: RootState) => state.user.users);

    return (
        <>
            {users.map((user) => (
                <div key={user.id}>
                    <Link to={`/user/${user.id}`}>
                        <p>{user.username}</p>
                    </Link>
                </div>
            ))}
        </>
    );
}

export default UserList;