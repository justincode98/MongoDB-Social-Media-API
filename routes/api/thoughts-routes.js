const router = require('express').Router();
const {
    getAllThought,
    getThought,
    addThought,
    updateThought,
    removeThought,
    clearThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router.route('/')
    .get(getAllThought)
    .post(addThought)
    .delete(clearThought) //created for debugging purposes


// /api/thoughts/<thoughtId>
router
    .route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(removeThought);
    


// /api/thoughts/<thoughtId>/
router.route('/:thoughtId/reaction/').post(addReaction);

// /api/thoughts/<thoughtId>/<reactionId>
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;