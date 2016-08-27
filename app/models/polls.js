'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    creator: String,
    created: { type: Date, default: Date.now },
	title: String,
});

var Votes = new Schema({
    pollId: String,
    option: String,
    numVotes: Number
});

module.exports.poll = mongoose.model('Poll', Poll);
module.exports.votes = mongoose.model('Votes', Votes);