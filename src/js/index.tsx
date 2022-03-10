console.log("this is music");

import *  as React from "react";
import { render } from "react-dom";

interface Iprops {
    children: string;
}
function App(props: Iprops) {
    return (
        <h1>{props.children}</h1>
    )
}
render(<App>hello TypeScript!</App>, document.getElementById("app"));