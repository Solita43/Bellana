import React from "react";
import back from "./back.svg";
import spash_collage from "./collage.png"

function Splash() {
    return (
        <div className="splash" style={{backgroundColor: "var(--background-color)", width: "100%"}}>
            <img src={back} alt="svg-background"></img>
            <img src={spash_collage} alt="collage" className="spash-collage"></img>
        </div>
    )
}

export default Splash