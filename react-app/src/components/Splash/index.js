import React from "react";
import back from "./back.svg"

function Splash() {
    return (
        <div className="splash" style={{backgroundColor: "var(--main-pink)"}}>
            <img src={back}></img>
        </div>
    )
}

export default Splash