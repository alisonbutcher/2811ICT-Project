'use strict';
module.exports = function(app) {
  var Login = require('../controllers/login.controller');

  // user Routes
  app.route('/login')
    .post(Login.login);
    // .post(Login.create_a_user);


//   app.route('/user/:userId')
//     .get(User.read_a_user)
//     .put(User.update_a_user)
//     .delete(User.delete_a_user);
};

// module.exports = (app, fs) => {
    // let obj;

    // // returns a list of all users
    // fs.readFile('data/data.json', 'utf-8', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         obj = JSON.parse(data);
    //     }
    // });

    // Handles user authentication requests.
//     app.get('/login/:name', (req, res) => {
//         const requestedUser = req.params['name'];
//         let str;
//         for (let i = 0; i < obj.users.length; i++) {
//             if (obj.users[i].name == requestedUser){
//                 str = obj.users[i];
//             }
//         }
//         if (str != null) {
//             let ur;
//             ur = obj.userRoles.find(x => x.userid == str.id);
//             str = '{ "id": ' + str.id + ', "name": "' + str.name + '", "email": "' + str.email  + '", "role": ';
            
//             if (ur != null) {
//                 str = str + ur.roleid + ' }';
//             } else {
//                 str = str + '0 }';
//             }
//             res.send(str);
//         } else {
//             res.send('{ "username": ' + requestedUser + ', "status": "not found" }');
//         }    
//     });
// };


