const express = require("express");
const app = express();
const methodOverride = require("method-override");
require("dotenv").config();
const Gift = require("./models/gift.js")
const Users = require("./models/users.js")
// const Mains = require("./models/main.js")
const path = require('path');
const giftsController = require('./controllers/gift.js')
const usersController = require('./controllers/users.js')
const mainsController = require('./controllers/main.js')
const session = require('express-session')

///////////
// access session 
const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here is the session secret')
console.log(SESSION_SECRET)

app.use(session({
	secret: SESSION_SECRET, 
	resave: false, 
	saveUninitialized: false 
}))



//connect with mongoose 
const mongoose= require("mongoose")
mongoose.connect(process.env.DATABASE_URI);

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	);


const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));



app.use('/gifts', giftsController);
app.use('/users', usersController);
app.use('/mains', mainsController);

app.use(express.static(path.join(__dirname,"public"))); //for CSS
app.use(express.static('CSSmain'));
// app.use(express.static('CSSregister'));


// /////////////////////////////////////////
// //Routes
// app.get('/gifts', (req, res) => {
// 	Gift.find({}, (err, foundGift) => {
// 		if(err){
//             console.log(err.message);
//         }
// 		// console.log(foundFruit[0])
// 		res.render('index.ejs', {
// 			gifts: foundGift
// 		});
// 	});
// });



// //new 
// app.get('/gifts/new', (req,res) => {
//     res.render('new.ejs')
// })

// //show 
// app.get('/gifts/:id', (req, res) => {
// 	Gift.findById(req.params.id, (err, foundGift) => {
// 		if(err){console.log(err.message)}
// 		res.render('show.ejs', {
// 			gift: foundGift
// 		})
// 	})
// });

// //delete:
// app.delete("/gifts/:id",(req,res)=>{
//     Gift.findByIdAndDelete(req.params.id, (err,deletedGift)=>{
//         if(err){
//             console.log(err)
//             res.send(err)
//         }else{
//             console.log(deletedGift)
//             res.redirect("/gifts")
//         }
//     })
// });
// //edit :
// app.get('/gifts/:id/edit',(req, res) => {
// 	Gift.findById(req.params.id, (err, foundGift) => {
// 		if(err) {
// 			console.log(err)
// 			res.send(err)
// 		} else {
// 			// make the edit form show the existing data 
// 			res.render('edit.ejs', {
// 				gift: foundGift
// 			})
// 		}
// 	})
// });





// //update :
// app.put("/gifts/:id",(req,res)=>{

// Gift.findByIdAndUpdate(req.params.id, req.body,{new:true,},
//     (err, updatedGift) =>{
//         if(err){
//             console.log(err)
//             res.send(err)
//         }else{
//             console.log(updatedGift)
//             res.redirect("/gifts")
//         }

//     })
// });



// //post
// app.post("/gifts", (req, res) => {
//     const { img, name, description, price, qty } = req.body;

//     Gift.create({ img, name, description, price, qty}, (err, newGift) => {
//       if (err) {
//         console.log(err.message);
//         res.redirect("/gifts/new"); // handle error
//       } else {
//         console.log("New gift created:", newGift);
//         res.redirect("/gifts");
//       }
//     });
//   });



// //purchase 
// app.get('/gifts/:id/buy',(req, res) => {
// 	Gift.findById(req.params.id, (err, foundGift) => {
// 		if(err) {
// 			console.log(err)
// 			res.send(err)
// 		} else {
// 			res.render('purchase.ejs', {
// 				gift: foundGift
// 			})
// 		}
// 	})
// });

// app.post('/gifts/:id/buy', (req, res) => {
//     Gift.findById(req.params.id, (err, foundGift) => {
//       if (err) {
//         console.log(err)
//         res.send(err)
//       } else {
//         // validate the quantity value
//         const qty = parseInt(req.body.qty)
//         if (isNaN(qty) || qty < 1) {
//           res.send('Invalid quantity')
//           return
//         }
//         if (qty > foundGift.qty) {
//           res.send('Insufficient stock')
//           return
//         }
//         // update the product quantity and save it to the database
//         foundGift.qty = foundProduct.qty - qty
//         foundGift.save()
//         res.redirect('/gifts')
//       }
//     })
// })
//////////


















// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));