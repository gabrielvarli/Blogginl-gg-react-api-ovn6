import React, { useEffect, useState } from 'react';
import Post from './Post';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(true); // För att toggla visningen av inläggen

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  // Toggla visningen av inläggen
  const togglePosts = () => {
    setShowPosts(!showPosts);
  };

  return (
    <div>
      <button onClick={togglePosts} style={{ margin: '10px', padding: '10px', borderRadius: '5px' }}>
        {showPosts ? 'Dölj inlägg' : 'Visa inlägg'}
      </button>

      {showPosts && posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
