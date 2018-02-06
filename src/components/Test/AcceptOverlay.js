import React from 'react'

const AcceptOverlay = ({ label, isShow, start }) => (
  <div id="acceptOverlay" className={`${isShow? '' : 'fade'}`}>

    <div className="spinner"></div>
    <button className="accept-btn" onClick={start}>{label}</button>
  </div>
);

export default AcceptOverlay
