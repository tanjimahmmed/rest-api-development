
import {rateLimit} from 'express-rate-limit';

// config rate limit middleware to prevent abuse
const limiter = rateLimit({
	windowMs: 60000, // 1 minutes
	limit: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	message: {
        error: 'You have sent to many requests in a given amount of time. Please try again later'
    }
})

export default limiter;