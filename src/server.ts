// Node Modules
import express from 'express';

// Express app initial
const app = express();

app.listen(3000, () => {
    console.log(`Server running: http://localhost:3000`);
});