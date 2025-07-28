const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const DAILY_API_KEY = "6c3e54b5d584414ae4a9bbf931e8d5e285554915dad6e5a39733840c5607eb1d";

app.post('/api/create-room', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.daily.co/v1/rooms',
      {},
      { headers: { Authorization: `Bearer ${DAILY_API_KEY}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 