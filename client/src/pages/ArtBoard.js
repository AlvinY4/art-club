import React from 'react';
import PostList from '../components/PostList';

import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

const Artboard = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    console.log(posts);
  
    return (
        <main>
            <div className="flex-row justify-space-between">
            <div className="col-12 mb-3">
                {loading ? (
                <div>Loading...</div>
                ) : (
                <PostList posts={posts} title="Some Posts ..." />
                )}
            </div>
            </div>
        </main>
    );
};

export default Artboard;