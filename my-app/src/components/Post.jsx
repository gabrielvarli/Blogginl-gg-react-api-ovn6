import React, { useEffect, useState } from 'react';
import UserInfo from './UserInfo';


const Post = ({ post }) => {
  const [showUserInfo, setShowUserInfo] = useState(false); // För att toggla visningen av användarinformation
  const [comments, setComments] = useState([]); // För kommentarer
  const [loadingComments, setLoadingComments] = useState(true); // För att visa laddningsstatus
  const [showComments, setShowComments] = useState(false); // För att toggla visningen av kommentarer
  const [showContent, setShowContent] = useState(true); // För att toggla visningen av titel och text

  // Toggla visning av UserInfo-komponenten
  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  // Toggla visning av kommentarer
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Toggla visning av titel och textinnehåll
  const toggleContent = () => {
    setShowContent(!showContent);
  };

  // Hämta kommentarer för inlägget
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
      const data = await response.json();
      setComments(data);
      setLoadingComments(false); // Ställ in laddningsstatus till false när kommentarerna har hämtats
    };

    fetchComments();
  }, [post.id]); // Beror på post.id för att hämta kommentarer

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
      <button onClick={toggleContent} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px' }}>
        {showContent ? 'Dölj innehåll' : 'Visa innehåll'}
      </button>

      {showContent && (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      )}

      {/* Knapp för att toggla användarinformation */}
      <button onClick={toggleUserInfo} style={{ marginTop: '10px', padding: '10px', borderRadius: '5px' }}>
        {showUserInfo ? 'Dölj användarinformation' : 'Visa användarinformation'}
      </button>

      {/* Rendera UserInfo-komponenten om knappen har klickats */}
      {showUserInfo && <UserInfo userId={post.userId} />}

      {/* Knapp för att toggla kommentarer */}
      <button onClick={toggleComments} style={{ marginTop: '10px', padding: '10px', borderRadius: '5px' }}>
        {showComments ? 'Dölj kommentarer' : 'Visa kommentarer'}
      </button>

      {/* Visa laddning eller kommentarer */}
      {loadingComments ? (
        <p>Laddar kommentarer...</p>
      ) : (
        showComments && (
          <div>
            <h4>Kommentarer:</h4>
            {comments.length === 0 ? (
              <p>Inga kommentarer tillgängliga.</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} style={{ border: '1px solid #eee', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
                  <p><strong>{comment.name}</strong></p>
                  <p>{comment.body}</p>
                  <p><em>{comment.email}</em></p>
                </div>
              ))
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Post;
