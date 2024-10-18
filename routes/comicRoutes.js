const express = require('express');
const router = express.Router();
const comicController = require('../controllers/comicController');

router.post('/', comicController.createComic);
router.get('/', comicController.getComics);
router.get('/:id', comicController.getComicById);
router.put('/:id', comicController.updateComic);
router.delete('/:id', comicController.deleteComic);

module.exports = router;
