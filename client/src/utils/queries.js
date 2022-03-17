import { gql } from '@apollo/client';

// gets all post
export const QUERY_POSTS = gql`
    query posts($username: String){
        posts(username: $username) {
            _id
            postTitle
            postText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;
//gets post by ID
export const QUERY_POST = gql`
    query post($id: ID!){
        post(_id: $id) {
            _id
            postTitle
            postText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;

//get user by username
export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username){
            _id
            username
            email
            posts {
                _id
                postTitle
                postText
                createdAt
                commentCount
            }
        }
    }
`;

//get all logged in user data
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            postCount
            posts{
                _id
                postTitle
                postText
                createdAt
                commentCount
                comments {
                    _id
                    createdAt
                    commentBody
                    username
                }
            }
        }
    }
`;

//get portion logged in user data
export const QUERY_ME_BASIC = gql`
    {
        me {
            _id
            username
            email
            postCount
        }
    }
`;