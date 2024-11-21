import express from 'express';
const router = express.Router();
import * as userHandler from '../handler/entity-handler';

// Get all documents
router.route('/').get(userHandler.get);
// Get document by ID
router.route('/:id').get(userHandler.getById);
// Create a new document
router.route('/').post(userHandler.create);
// Update an existing document
router.route('/:id').put(userHandler.patch);
// Delete a document by ID
router.route('/:id').delete(userHandler.remove);
//To activate or deactivate any document
router.route('/:id/status').patch(userHandler.patchStatus);

export default router;
