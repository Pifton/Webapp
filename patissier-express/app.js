const express = require('express');
const app = express();
const port = 3000;


const userRoutes = require('./routes/userRoutes');


app.use(express.json());
app.use('/api',userRoutes);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

