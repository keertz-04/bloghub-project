const express = require('express');
const blogRoutes = require('./routes/blogRoutes');
const app = express();
app.use(express.json());
app.use('/api/blog', blogRoutes);
app.get('/api/health', (req, res) => res.json({ok:true}));
app.listen(5010, () => console.log('Test server running on 5010'));
