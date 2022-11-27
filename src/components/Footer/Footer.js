import React from "react";
import './Footer.css';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="row">
        <strong className="col">Customer Support</strong>
        <a href="#" className="col" >Support@r3s.vn</a>
        <a href="#" className="col" >090-000-001</a>
      </div>
      <div className="row">
        <strong className="col">About Us</strong>
        <a href="#" className="col" >How to use R3S</a>
        <a href="#" className="col" >Q&A</a>
      </div>
      <div className="row">
        <strong className="col">Connect</strong>
        <a href="#" className="col" >Facebook</a>
        <a href="#" className="col" >Instagram</a>
      </div>
    </div>
  );
};
