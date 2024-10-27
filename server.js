import express from 'express';
import path from 'path';
import posts from './routes/posts.js'
const port = process.env.PORT || 8000;
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';
import { fileURLToPath } from 'url';



// Get file directory name

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// here how can i use middleware as the name of logger function
app.use(logger)

// set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// routes 
app.use('/api', posts);

// Catch All middlewares
app.use(notFound)
// Error handler middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
})