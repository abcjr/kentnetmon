var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('comments');
var Agent = mongoose.model('agents');

/* GET form. */
router.get('/', function (req, res) {
    Comment.find(function (err, comments) {
        res.render(
            'agents', {
                title: 'KentNetMon Agents',
                comments: comments
            }
        );
    });
    Agent.find(function (err, agents) {
        res.render(
            'agents', {
                title: 'KentNetMon Agents',
                agents: agents
            }
        );
    })
});

/* POST form. */
router.post('/', function (req, res) {
    new Comment({
            title: req.body.comment
        })
        .save(function (err, comment) {
            res.redirect('agents');
        });
});


module.exports = router;
