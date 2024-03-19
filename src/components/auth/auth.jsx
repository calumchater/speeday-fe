import React, { useCallback, useEffect } from "react";

import styled from "styled-components";

const AuthButton = styled.button`
    cursor: pointer;
    border: 0;
    border-radius: 4px;
    font-weight: 600;
    margin: 0 10px;
    width: 200px;
    padding: 10px 0;
    box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
    transition: 0.4s;
    color: #008B8B;
    background-color: #FFFFF0;
    border: 1px solid #008B8B;
  
  
  &:hover {
    color: white; 
    width:;
    box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
    background-color: #008B8B;
  }
`
function LoginButton() {

    const openGoogleLoginPage = useCallback(() => {
        window.location.href = "http://localhost:8000/google/redirect";
    }, []);

    return (
        <AuthButton
            onClick={openGoogleLoginPage}
        >
            Sign in with Google
        </AuthButton>
    );
};

function LogoutButton() {

    useEffect(() => {
        localStorage.removeItem('auth_token');
    });

    return <AuthButton> Logout </AuthButton>;
}

export default function Auth() {

    let loggedIn = document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/, "$1").length > 0 ? true : false

    if (loggedIn) {
        return <LogoutButton></LogoutButton>
    } else {
        return <LoginButton></LoginButton>
    }
}