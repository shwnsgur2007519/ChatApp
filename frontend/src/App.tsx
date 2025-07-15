import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8000/api/hello/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
