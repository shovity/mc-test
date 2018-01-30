import React from 'react'

import Post from './Post'

const Dumb = ({ post, username }) => (
    <div id="newsFeed">
        <div className="posts">
            <div className="post-box">
                <textarea placeholder="Post's content..."></textarea>
                <button onClick={() => {
                    post('sdfdsf')
                }} className="btn btn-success btn-post">POST</button>
            </div>

            <Post username={username} />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    </div>
);

export default Dumb;
