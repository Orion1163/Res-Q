import React from "react";

export const Features = (props) => {
  return (
    <div id="features" className="text-center" style={{ backgroundColor: '#333', color: '#ffffff' }}>
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row" style={{ backgroundColor: '#333', color: '#ffffff' }}>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3" style={{color: '#ffffff'}}>
                  {" "}
                  <i className={d.icon} ></i>
                  <h3 style={{color:'#ffffff'}}>{d.title}</h3>
                  <p style={{color:'#fff'}}>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
