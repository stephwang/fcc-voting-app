'use strict';

var Poll = require('../models/polls.js');

function PollHandler () {
    
    this.getPollsList = function(req, res){
        Poll.poll.find({}, function(err, polls){
            if(err) throw err;
            res.json(polls);
        });
    };
    
    this.getOptionsList = function(req, res){
        Poll.votes.find({pollId: req.params.pollid}, function(err, options){
            if(err) throw err;
            res.render(process.cwd() + '/public/poll.ejs', {
			    options: options
			});
        });
    };
    
	var self = this;
	
	this.addPollAndRedirect = function (req, res) {
	    var title = req.query['title'];
	    var options = req.query['options'].split('\r\n');
	    
	    // add the poll in the poll
		var poll = new Poll.poll({
    	    creator: req.user.github.id,
    		title: title,
        });
        poll.save(function (err, data) {
            if (err) console.log(err);
            else {
                console.log('Saved : ', data );

                // add each option to options
                var optionsAdded = 0;
                options.forEach(function(element){
                    self.addOption(data._id, element);
                    optionsAdded++;
                    if(optionsAdded == options.length) {
                        // finally, redirect to the poll page
                        res.redirect('/poll/' + data._id);
                    }
                });
            }
        });
	};
	
	this.addOption = function(table, option) {
	    Poll.votes.update(
            {pollId: table, option: option}, 
            { $setOnInsert: { pollId: table, option:option, numVotes: 0 } }, 
            {upsert: true}, 
            function(err, numAffected) {
                if(err) throw err;
                else console.log('added option: ' + numAffected);
            }
        );
	};

}

module.exports = PollHandler;
