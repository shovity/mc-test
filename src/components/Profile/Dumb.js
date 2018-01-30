import React from 'react';

const Dumb = ({ avatar }) => (
    <div id='profile'>
        <div className="info-row">
            <div className="avatar-box">
                { avatar && <img src={avatar} alt="avatar"/> }
            </div>

            <div className="info-text">
                <p>Shovity</p>
                <p>Shovity</p>
            </div>
        </div>
    </div>
);

export default Dumb;
