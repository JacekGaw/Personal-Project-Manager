import React, {useContext} from 'react';
import { AuthContext } from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';


const Account = () => {
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user)

    const handleLogOut = async () => {
        try {
            await logout();
            navigate("/signin");
        }
        catch (e) {
            console.log(e.message);
        }
    }

    return (<>
        <h1>Account page</h1>
        <button onClick={handleLogOut}>Log out</button>
        </>
    );
}

export default Account;