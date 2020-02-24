const express = require('express');
const router = express.Router();


// @route   GET api/membre/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req,res) => {
    res.json({msg: 'Membres works'})
})

module.exports= router;

