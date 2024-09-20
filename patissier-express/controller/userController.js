const db = require('../db'); 

const getAllUsers = (req, res) =>{
     db.any('SELECT * FROM "User"').then((users) => {
         res.json({
             message: `${users.length} résultat récupéré`,
             data: users,
         });
     })
     .catch((error) => {
         res.status(500).json({
             error: error.message,
         });
     });
 };
 
const registerUser = (req, res) =>{
     const {mail, password, user_title} = req.body;
     db.oneOrNone('SELECT * FROM "User" WHERE mail = $1', [mail]).then(user => {
       if (!user) {
         db.one('INSERT INTO "User" (mail, password, user_title) VALUES ($1, $2, $3) RETURNING *', [mail, password, user_title])
             .then((newUser) => {
                 res.json({
                     message: `User registered`,
                     data: newUser
                 }); 
         })
       }
       else {
         return res.status(400).json({
             error: 'Utilisateur existant',
           }); 
       }  
     })
     .catch((error) => {
         res.status(500).json({
             error: error.message,
         });
     });
 };
 
const loginUser = (req, res) =>{
     const {mail, password} = req.body;
     db.oneOrNone('SELECT * FROM "User" WHERE mail = $1', [mail])
         .then((user) => {
             if (user) {
                 if (user.password === password) {
                     return res.json({
                         message: `Connexion reussie`,
                         data: {id: user.id, mail: user.mail, user_title: user.user_title}
                     });
                 }
                 else {
                     return res.status(400).json({
                         error: 'Mot de passe incorrect',
                       });
                 }
             }if (!user) {
                 return res.status(400).json({
                     error: 'Utilisateur inexistant',
                   });
             }
     })
     .catch((error) => {
         res.status(500).json({
             error: error.message,
         });
     });
 };
 
 module.exports = {
     getAllUsers,
     registerUser,
     loginUser
 }