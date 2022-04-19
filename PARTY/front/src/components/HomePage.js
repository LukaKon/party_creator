import React from "react";

export const HomePage = () => {
    return (
        <div>
            HomePage
            {localStorage.getItem('access_token')
                ? "Zalogowany"
                : "Niezalogowany"}
        </div>
    )
}