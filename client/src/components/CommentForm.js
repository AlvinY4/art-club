//user will create new comment
import React, { useState } from 'react'; 

import { useMutation } from '@apollo/client'; 
import { ADD_COMMENT } from '../../src/utils/mutations'; 

const CommentForm = ({ commentId }) => {
    const [commentBody, setBody] = useState(''); 
    const [characterCount, setCharacterCount] = useState(0); 
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = (event) => {
        if (event.target.value.length <= 500) {
            setBody(event.target.value); 
            setCharacterCount(event.target.value.length); 
        }
    }; 

    const handleFormSubmit = async (event) => {
        event.preventDefault(); 

        try {
            await addComment({
                variables: { commentBody, commentId }, 
            });

            setBody(''); 
            setCharacterCount(0);
        } catch (e) {
            console.error(e); 
        }
    }; 

    return (
        <div>
            <p 
              className={`m-0 ${characterCount === 500 || error ? 'text-error' : ""}`}
            >
                character Count: {characterCount}/500
                {error && <span className="ml-2">Error...</span>}
            </p>
            <form 
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea 
                    placeholder="Leave a Comment"
                    value={commentBody}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default CommentForm;