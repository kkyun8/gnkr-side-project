import React from 'react';
import styled from 'styled-components';

const EditorStyle = styled.section`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
        width: 45%;
        font-size: 1rem;
        outline: none;
        margin-bottom: 1rem;
        padding: 1rem;
        border: 1px solid #DADCE0;
        border-radius: .5rem;
    }

    input:focus {
        border: 1.2px solid #1A73E8;
    }

    textarea {
        width: 45%;
        font-size: 1rem;
        margin-bottom: 1rem;
        padding: 1rem;
        border: 1px solid #DADCE0;
        border-radius: 0.5rem;
    }

    textarea:focus {
        border: 0.8px solid #1A73E8;
    }

    button {
        background-color: #5CB85C;
        font-size: 1rem;
        color: #FFFFFF;
        outline: none;
        padding: 1rem;
        border: 1px solid #DADCE0;
        border-radius: .5rem;
    }

    button:hover {
        background-color: green;
        cursor: pointer;
    }
`

const Editor = () => {
    return (
        <EditorStyle>
            <input type="text" placeholder="Article Title"/>
            <input type="text" placeholder="What's this article about?"/>
            <textarea name="contents" cols="30" rows="10" placeholder="Write your article"></textarea>
            <input type="text" placeholder="Enter tags"/>
            <button type="submit">Publish Article</button>
        </EditorStyle>
    )
}

export default Editor;