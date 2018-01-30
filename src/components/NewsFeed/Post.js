import React from 'react';

const Post = ({ username = 'Guest'}) => (
    <div className="post">
        <div className="title">
            <img src="/images/unknown-user.png" alt="avatar" className="avatar"/>
            <div className="name">{username}</div>
        </div>

        <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic minus ab corrupti nesciunt et ducimus, magni excepturi accusantium quos recusandae dolor ullam provident, aliquam voluptas ratione doloremque, animi illo aliquid.
        </div>

        <Comments />

        <div className="input">
            <input type="text"/>
            <button className="btn btn-send">SEND</button>
        </div>
    </div>
);

const Comments = () => {
    return (
        <div className="comments">
            <div className="comment">
                <img src="/images/unknown-user.png" alt="avatar" className="avatar"/>
                <div className="comment-content">
                    <strong className="name">comment</strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempore?
                </div>
            </div>

            <div className="comment">
                <img src="/images/unknown-user.png" alt="avatar" className="avatar"/>
                <div className="comment-content">
                    <strong className="name">comment</strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempore?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempore?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempore?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempore?
                </div>
            </div>

            <div className="comment">
                <img src="/images/unknown-user.png" alt="avatar" className="avatar"/>
                <div className="comment-content">
                    <strong className="name">comment</strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, tempore?
                </div>
            </div>
        </div>
    )
}

export default Post;
