import React, { PureComponent } from "react";

// Stateless react component return shimmer template.
const Template = ({ style }) => (
  <div className="timeline-wrapper" style={style}>
    <div className="timeline-item z-depth-1">
      <div className="animated-background">
        <div className="background-masker header-left" />
        <div className="background-masker header-bottom" />
        <div className="background-masker subheader-left" />
        <div className="background-masker subheader-bottom" />
        <div className="background-masker content-first-end" />
        <div className="background-masker content-third-line" />
        <div className="background-masker content-fourth-line" />
      </div>
    </div>
  </div>
);

// Stateless react component responsible to show loading state for next messages.
export const Shimmer = ({ style, count = 1}) => {
  const nodes = [];
  for (let x = 1; x <= count; x++) {
    nodes.push(<Template key={'shim-'+x} style={style} />);
  }
  return nodes;
};
