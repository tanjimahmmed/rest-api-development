// Node Modules
import express from 'express';
import config from '@/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import limiter from '@/lib/express_rate_limit';

import type { CorsOptions } from 'cors';

// Express app initial
const app = express();

// Configure cors options
const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if(config.NODE_ENV === 'development' || !origin){
            callback(null, true)
        }else {
            callback(new Error(`Cors error: ${origin} is not allowed by Cors`), false)
        }
    }
};

// Apply cors middleware
app.use(cors(corsOptions));

// Enable json req body parsing
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

// enable response compression to reduce payload size and improve performance
app.use(
    compression({
        threshold: 1024, // only compress response larger than 1kb
    })
);

// enhance security by setting various http headers
app.use(helmet());

// apply rate limiting middleware to prevent excessive requests and enhance security
app.use(limiter);

(async () => {
    try {
        app.get('/', (req, res) => {
            res.json({
                message: 'Hello Word',
            });
        });

        app.listen(config.PORT, () => {
            console.log(`Server running: http://localhost:${config.PORT}`);
        });
    }catch(err){
        console.log('Failed to start the server', err);

        if(config.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
})();

