import express from 'express'; // import express

import {getFeedbacks, getFeedbackByID, createFeedback, updateFeedback, deleteFeedback} from '../controllers/feedback.js'; // import the functions from the controller

const router = express.Router(); // create a router

router.get('/', getFeedbacks);

router.get('/:id', getFeedbackByID);

router.post('/', createFeedback);

router.patch('/:id', updateFeedback);

router.delete('/:id', deleteFeedback);

export default router; // export the router




