import { useParams } from "react-router-dom";
import usersData from "../data/users.json";
import NotFound from "./NotFound";

function UserNames() {
    let { id } = useParams();

    let user = usersData.users.find((user) => {
        return user.id.toString() === id;
    });
    if (!user) {
        return <NotFound />;
    }
    return (
        <>
            <h1>{user?.username}</h1>
            <div className="user-image">
                <img src={user?.image} />
            </div>
        </>
    );
}

export default UserNames;