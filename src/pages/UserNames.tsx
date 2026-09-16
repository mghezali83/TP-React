import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import usersData from "../data/users.json";

function UserNames() {
    let { id } = useParams();

    let user = usersData.users.find((user) => {
        return user.id.toString() === id;
    });

    return (
        <>
            <h1>{user?.username}</h1>
            <img src={user?.image} />
        </>
    );
}

export default UserNames;