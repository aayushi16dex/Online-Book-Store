// var express = require('express');
// var router = express.Router();

// const userController = require('../controllers/user.controller')

// router.get('/list', userController.getUserList);
// router.get('/view', userController.getUserDetails);
// router.post('/add', userController.registerUser);
// router.put('/edit', userController.editUser);
// router.delete('/delete', userController.deleteUser);


// /* GET users listing. */
// // router.get('/list', function(req, res, next) {
// //    userModel.find(function(err, userList){
// //     if(err){
// //       res.send({status: 500, message:'Unable to find user'});
// //     }
// //     else{
// //       const recordCount = userList.length;
// //       res.send({status: 200, recordCount: recordCount, result: userList});
// //     }

// //    });
// // });

// /* GET particular user details*/
// // router.get('/view', function(req, res, next) {
// //   const userId = req.query.userId;
// //   userModel.findById(userId, function(err, userResponse){
// //    if(err){
// //      res.send({status: 500, message:'Unable to find userId'});
// //    }
// //    else{
// //     console.log("userResponse",userResponse);
// //      res.send({status: 200, result: userResponse});
// //    }
// //   });
// // });

// /* create new user */
// // router.post('/add', function(req, res, next) {

// //   let email = req.body.email;
// //   let firstName = req.body.firstName;
// //   let lastName = req.body.lastName;
// //   let password = req.body.password;
// //   let _id = req.body.email;

// //   let userObj = new userModel({
// //     email: email,
// //     firstName: firstName,
// //     lastName: lastName,
// //     password: password,
// //     _id: _id

// //   });

// //   userObj.save(function(err, userObj){
// //     if(err){
// //       res.send({status: 500, message:'User already exists', error: err});
// //     }
// //     else{
// //       res.send({status: 200, message:'Added successfully', userDetail: userObj});
// //     }
// //   });
// // });

// /* Update users data. */
// // router.put('/edit', function(req, res, next) {
//   // const userId = req.body.userId;
//   // let email = req.body.email;
//   // let firstName = req.body.firstName;
//   // let lastName = req.body.lastName;
//   // let password = req.body.password;
//   // let _id = req.body._id;

//   // let userObj = {
//   //   email: email,
//   //   firstName: firstName,
//   //   lastName: lastName,
//   //   password: password,
//   //   _id : _id
//   // };
  
//   // userModel.findByIdAndUpdate(userId, userObj, function(err, userResponse){
//   //   if(err){
//   //     res.send({status: 500, message:'Unable to update user'});
//   //   }
//   //   else{
//   //     res.send({status: 200, message:'Updated successfully', result: userResponse});
//   //   }
//   // }); 
// // });

// // /* delete selected user */
// // router.delete('/delete', function(req, res, next) {
// //   const userId = req.query.userId;

// //   userModel.findByIdAndDelete(userId, function(err, userResponse){
// //    if(err){
// //      res.send({status: 500, message:'Unable to find userId'});
// //    }
// //    else{
// //      res.send({status: 200, message: 'Deleted Successfully' ,result: userResponse});
// //    }
// //   });
// // });

// module.exports = router;
