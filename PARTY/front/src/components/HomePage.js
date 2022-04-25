import React from "react";

export const HomePage = () => {
    return (
        <div>
            HomePage
            {sessionStorage.getItem('access_token')
                ? "Zalogowany"
                : "Niezalogowany"}
        </div>
    )
}