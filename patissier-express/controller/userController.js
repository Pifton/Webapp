const db = require('../db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'token';

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
         const hashedPassword = bcrypt.hashSync(password, 10);
         db.one('INSERT INTO "User" (mail, password, user_title) VALUES ($1, $2, $3) RETURNING *', [mail, hashedPassword, user_title])
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
                 if (bcrypt.compareSync(password, user.password)) {
                     const token = jwt.sign({id: user.id, mail: user.mail, user_title: user.user_title}, SECRET_KEY, {expiresIn: '1h'});
                     return res.json({
                         message: `Connexion reussie`,
                         data: {id: user.id, mail: user.mail, user_title: user.user_title, token}
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

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (token) {
        const authorized = jwt.verify(token, SECRET_KEY);
        if (authorized) {
            req.user = authorized;
            next();
        } else {
            res.status(401).json({
                message: 'Unauthorized',
                error: 'Token invalid'
            });
        } 
    }
    if (!token) {
        res.status(401).json({
            message: 'No token'
        });
    }
}

const titlePatissier = (req, res, next) => {
    if (req.user.user_title === 'patissier') {
        next();
    } else {
        res.status(401).json({
            message: 'not a patissier'
        });
    }
}
 
 module.exports = {
     getAllUsers,
     registerUser,
     loginUser,
     verifyToken,
     titlePatissier
 }