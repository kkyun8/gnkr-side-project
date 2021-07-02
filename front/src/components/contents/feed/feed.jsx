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

function Feed({feed}) {
    const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1624821622383-f213ad4c0403?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80';
    const {id, user, image, date, title, description} = feed;
    const imageUrl = image || DEFAULT_IMAGE;
    return (
        <FeedStyle>
            <button>❤️0</button>
            <div className="feed__meta">
                <img className="image" src={imageUrl} alt="" />
                {user}{date}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Read more...</p>
        </FeedStyle>
    );
}

export default Feed;