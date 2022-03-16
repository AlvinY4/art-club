import React from 'react';

//This returns all of the post
const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="card mb-3">
            <p className="card-header">
              {post.username}
              posted on {post.createdAt}
            </p>
            <div className="card-body">
              <h4>{post.postTitle}</h4>
              <p>{post.postText}</p>
              <p className="mb-0">
                Comments: {post.commentCount} || Click to{' '}
                {post.commentCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;

