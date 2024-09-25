import React, { useState, useEffect } from 'react';

const UserInfo = ({ userId }) => {
  const [user, setUser] = useState(null); // För att spara användardata
  const [loading, setLoading] = useState(true); // Laddningsindikator
  const [error, setError] = useState(null); // Felhantering

  // useEffect för att hämta användarinformation när komponenten mountas
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error('Kunde inte hämta användardata.');
        }
        const data = await response.json();
        setUser(data); // Spara användardata i state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Sätt laddningsindikator till falskt när hämtning är klar
      }
    };

    fetchUser(); // Hämta användaren baserat på userId
  }, [userId]); // Kör varje gång userId ändras

  if (loading) return <p>Laddar användarinformation...</p>;
  if (error) return <p>{error}</p>;

  return (
    user && (
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <h4>Användarinformation</h4>
        {/* <p><strong>Namn:</strong> {user.name}</p> */}
        <p><strong>Användarnamn:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* <p><strong>Telefon:</strong> {user.phone}</p>
        <p><strong>Webbplats:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        <p><strong>Företagsnamn:</strong> {user.company.name}</p>
        <p><strong>Företagsbeskrivning:</strong> {user.company.catchPhrase}</p> */}
        <p><strong>Stad:</strong> {user.address.city}</p>
        {/* <p><strong>Gatuadress:</strong> {user.address.street}, {user.address.suite}</p>
        <p><strong>Postnummer:</strong> {user.address.zipcode}</p> */}
      </div>
    )
  );
};

export default UserInfo;
