import React from "react";
import { Button } from "react-bootstrap";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

function Logout() {
    const auth = getAuth();

    const onLogOutClick = () => {
        auth.signOut();
    };

    return (
        <>
            <Button type="button" class="btn btn-outline-danger">
                Logout
            </Button>
        </>
    );
}

export default Logout;
