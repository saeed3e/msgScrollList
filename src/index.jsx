import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Import root/main componet or entry point of application
 */
import RootComponent from "./components/root.jsx";

/**
 * Render the application by "RootComponent" inside a div having Id="root" 
 */
const rootElem = document.createElement('div');
rootElem.id = "root"
document.body.appendChild(rootElem);
ReactDOM.render(<RootComponent />, document.getElementById("root"));
