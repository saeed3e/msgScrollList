import React, { PureComponent } from "react";

/**
 * Create Header as a stateles component
 */
export const Header = ()=>{
  return (
    <div>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="sidenav-trigger">
              <span className="box-shadow-menu" />
            </a>
            <a href="#!" className="brand-logo">
              Messages
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
