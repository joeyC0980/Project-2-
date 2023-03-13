
   
const express = require('express');
const bcrypt = require('bcrypt');
const Gift = require('../models/gift.js');
// we need our User model 
const User = require('../models/users.js');


const router = express.Router();




// custom middleware to require authentication on routes 
const authRequired = (req, res, next) => {
	console.log(req.session.currentUser)
	if (req.session.currentUser) {
		
		next() 
		// next is part of express
		// it does what it says 
		// i.e., go on to the next thing
	} else {
		// if there is no user 
		res.send('You must be logged in to do that!')
		// res.redirect('/users/signin')
	}
};



////////

router.get('/register', (req, res) => {
	res.render('users/register.ejs')
});

router.post('/register', (req, res) => {
	
	const salt = bcrypt.genSaltSync(10)

	req.body.password = bcrypt.hashSync(req.body.password, salt)
	
	User.findOne({username: req.body.username}, (err, userExists) => {
		if (userExists) {
			res.send('that username is taken')
		} else {
			User.create(req.body, (err, createdUser) => {
				console.log(createdUser)
				req.session.currentUser = createdUser
				res.redirect('/mains')
			})
		}
	})
});

router.get('/signin', (req, res) => {
	res.render('users/signin.ejs')
});

router.post('/signin', (req, res) => {
	
	User.findOne({username: req.body.username}, (err, foundUser) => {
		if(foundUser) {
			
			const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
		
			
			if(validLogin) {
				req.session.currentUser = foundUser
			
				res.redirect('/mains')
			} else {
				res.send('Invalid username or password')
			}

		} else {
		
			res.send('Invalid username or password')
		}
	})
});

// DESTROY session route 
router.get('/signout', (req, res) => {

	req.session.destroy()
	res.redirect('/users')
});




module.exports = router