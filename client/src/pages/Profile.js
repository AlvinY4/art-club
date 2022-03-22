import { Redirect, useParams } from 'react-router-dom';


import PostList from '../components/PostList';
import InspirationList from '../components/InspirationList';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

// url: /profile/<username> will display other profiles
//url: /profile will display loggedin user profile
const Profile = () => {

  const { username: userParam } = useParams();

  //checks to see what url is clicked on
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  //redirects if they are logged in and url /profile/<loggedinuser>
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />; 
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="profilelist">
        <h2 className="viewpro" align="center">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div class="create-post">
        <div class="create-post-header">
        <h2 class="create-post-title" 
             id="post-header-title">
              Create Your Content
         </h2>
  </div>

  <form id="create-form" 
  class="create-post-form" 
  name="form">

    <div class="create-post-content">
      <textarea name="post" 
      id="post-content" 
      class="create-post-textarea scroller"
      placeholder="Add your text here..">
      </textarea>
    </div>

    <div class="create-post-actions post-actions">
      <div 
      class="post-actions-attachments">
        <button type="button" 
        class="btn post-actions-upload attachments-btn">
        <label for="upload-image" class="post-actions-label">
            upload image
          </label>
        </button>
        <input type="file" id="upload-image" accept="image/*" multiple></input>
      </div>

      <div class="post-actions-create">
        <button class="btn post-actions-publish">post</button>
      </div>
    </div>
  </form>
</div>

      <div className="postprofile">
        <div >
          <PostList  posts={user.posts} title={`${user.username}'s thoughts...`} />
        </div>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <InspirationList inspirations={user.inspirations} />
        </div>
      </div>

    </div>
  );
};

export default Profile;