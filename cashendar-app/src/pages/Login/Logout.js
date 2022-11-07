import React from "react";

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
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}

export default Logout;
