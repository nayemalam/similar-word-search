import express from 'express';
import {
  createWord,
  deleteWord,
  getAllRoutes,
  getCleanCorpus,
  getCorpus,
  getSimilarTextFromQuery,
  updateWord,
} from '../controllers/api.js';

const router = express.Router();

router.get('/', getAllRoutes);

router.get('/corpus', getCorpus);

router.get('/cleanCorpus', getCleanCorpus);

router.get('/cleanCorpus/:query', getSimilarTextFromQuery);

router.post('/cleanCorpus/:valueToAdd', createWord);

router.put('/cleanCorpus/:srcValue/:valueToUpdate', updateWord);

router.delete('/cleanCorpus/:values/:valueToDelete', deleteWord);

export default router;
