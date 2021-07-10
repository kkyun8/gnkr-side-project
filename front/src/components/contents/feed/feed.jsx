import React from 'react';
import styled from 'styled-components';

const FeedStyle = styled.li`
    list-style: none;
    border-bottom: 1px solid darkgray;
    .image {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }
`

function Feed({ feed }) {
    const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1531715047058-33b6c9df7897?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzU2fHxzbWlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60';
    const { user, image, updatedAt, title, body } = feed;
    const imageUrl = image || DEFAULT_IMAGE;
    return (
        <FeedStyle>
            <button>❤️0</button>
            <div className="feed__meta">
                <img className="image" src={imageUrl} alt="" />
                {user}{updatedAt}
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
            <p>Read more...</p>
        </FeedStyle>
    );
}

export default Feed;