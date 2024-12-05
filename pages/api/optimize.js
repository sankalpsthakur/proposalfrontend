// pages/api/optimize.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetch('http://127.0.0.1:5000/optimize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body)
        });
  
        if (!response.ok) {
          const text = await response.text();
          console.error('Error from backend:', text);
          return res.status(response.status).json({ error: 'Backend request failed' });
        }
  
        const data = await response.json();
        return res.status(200).json(data);
      } catch (error) {
        console.error('Error calling backend:', error);
        return res.status(500).json({ error: 'Something went wrong' });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  }
  