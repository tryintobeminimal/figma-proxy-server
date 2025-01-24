const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Proxy route to fetch images
app.get('/proxy', async (req, res) => {
  const imageUrl = req.query.url;  // URL of the image to fetch (passed as a query param)
  
  // Check if URL is provided
  if (!imageUrl) {
    return res.status(400).send('No URL provided');
  }

  try {
    // Fetch image from the provided URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Set content-type based on the response headers of the image
    res.set('Content-Type', response.headers['content-type']);

    // Send the image content
    res.send(response.data);
  } catch (error) {
    // If there's an error fetching the image
    res.status(500).send('Error fetching image');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
