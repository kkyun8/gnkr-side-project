import React from 'react';
import styled from 'styled-components';

const FeedStyle = styled.li`
    display: flex;
    list-style: none;
    justify-content: space-between;
    border-bottom: 1px solid darkgray;
    padding: 1.5rem 0.5rem;
    width: 100%
    cursor: pointer;
    
    p {
        margin: 0;
    }

    button {
        cursor: pointer;
        height: 30px;
        color: #5cb85c;
        background-color: transparent;
        border: 1px solid #5cb85c;
        border-radius: .2rem;
    }
    .image {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }

    .feed__info {
        display: flex;
    }
    
    .feed__info_name {
        margin: 0;
        padding-left: 0.5rem;
    }

    .feed__info_date {
        margin: 0;
        padding-left: 0.5rem;
    }

    .feed__title {
        margin: 0;
    }
    .feed__body {
        color: #999;
        font-size: 1rem;
        margin-top: 0;
    }
    .feed__read {
        color: #bbb;
        font-size: 0.8rem;
    }
`

function Feed({ feed }) {
    
    const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1531715047058-33b6c9df7897?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzU2fHxzbWlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60';
    const { title, body, createdAt, user } = feed;
    const imageUrl = user.image || DEFAULT_IMAGE;
    const thumbsCounter = 1;
    return (
        <FeedStyle>
            <div className="feed__meta">
                <div className="feed__info">
                    <img className="image" src={imageUrl} alt="profile_image" />
                    <div>
                        <p className="feed__info_name">{user.name}</p>
                        <p className="feed__info_date">{createdAt}</p>
                    </div>
                </div>
                <div>
                <h1 className="feed__title">{title}</h1>
                <p className="feed__body">{body}</p>
                </div>
                <span className="feed__read">Read me...</span>
            </div>
            <button>❤️{thumbsCounter}</button>
        </FeedStyle>
    );
}

export default Feed;