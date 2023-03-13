const express = require('express')
const router = express.Router()
const Gift = require('../models/gift.js')


const authRequired = (req, res, next) => {
	console.log(req.session.currentUser)
	if (req.session.currentUser) {
		next() 	
	} else {
		res.send('You must be logged in to do that!')
	
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
		res.render('main.ejs', {
			gifts: foundGift
		});
	});
});




//show 
router.get('/:id', (req, res) => {
	Gift.findById(req.params.id, (err, foundGift) => {
		if(err){console.log(err.message)}
		res.render('showmain.ejs', {
			gift: foundGift
		})
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





module.exports = router