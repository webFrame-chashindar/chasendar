import React from "react";
import { Button } from "react-bootstrap";

import { getAuth } from "firebase/auth";

function Logout({ className }) {
    const auth = getAuth();

    const onLogOutClick = () => {
        auth.signOut();
    };

    return (
        <>
            <Button
                className={className}
                type="button"
                class="btn btn-outline-danger"
                onClick={onLogOutClick}
            >
                Logout
            </Button>
        </>
    );
}

export default Logout;
