import React from "react";
import { Button } from "react-bootstrap";

import { getAuth } from "firebase/auth";

function Logout({ id }) {
    const auth = getAuth();

    const onLogOutClick = () => {
        auth.signOut();
    };

    return (
        <>
            <Button
                id="logout"
                type="button"
                className="btn btn-outline-dark"
                size="xs"
                onClick={ () => onLogOutClick()}
            >
                Logout
            </Button>
        </>
    );
}

export default Logout;
