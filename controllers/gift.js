const express = require('express')
const router = express.Router()
const Gift = require('../models/gift.js')

// custom middleware to require authentication on routes 
const authRequired = (req, res, next) => {
	console.log(req.session.currentUser)
	if (req.session.currentUser) {
		// a user is signed in 
		next() 
		// next is part of express
		// it does what it says 
		// i.e., go on to the next thing
	} else {
		// if there is no user 
		res.send('You must be logged in to do that!')
		// res.redirect('/users/signin')
	}
}


//routes
/////////////////////////////////////////
//Routes
router.get('/', (req, res) => {
	Gift.find({}, (err, foundGift) => {
		if(err){
            console.log(err.message);
        }
		// console.log(foundFruit[0])
		res.render('index.ejs', {
			gifts: foundGift
		});
	});
});



//new 
router.get('/new', (req,res) => {
    res.render('new.ejs')
})

//show 
router.get('/:id', (req, res) => {
	Gift.findById(req.params.id, (err, foundGift) => {
		if(err){console.log(err.message)}
		res.render('show.ejs', {
			gift: foundGift
		})
	})
});

//delete:
router.delete("/:id",(req,res)=>{
    Gift.findByIdAndDelete(req.params.id, (err,deletedGift)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(deletedGift)
            res.redirect("/gifts")
        }
    })
});
//edit :
router.get('/:id/edit',(req, res) => {
	Gift.findById(req.params.id, (err, foundGift) => {
		if(err) {
			console.log(err)
			res.send(err)
		} else {
			// make the edit form show the existing data 
			res.render('edit.ejs', {
				gift: foundGift
			})
		}
	})
});





//update :
router.put("/:id",(req,res)=>{

Gift.findByIdAndUpdate(req.params.id, req.body,{new:true,},
    (err, updatedGift) =>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log(updatedGift)
            res.redirect("/gifts")
        }

    })
});



//post
router.post("/", (req, res) => {
    const { img, name, description, price, qty } = req.body;

    Gift.create({ img, name, description, price, qty}, (err, newGift) => {
      if (err) {
        console.log(err.message);
        res.redirect("/gifts/new"); // handle error
      } else {
        console.log("New gift created:", newGift);
        res.redirect("/gifts");
      }
    });
  });






module.exports = router