const express = require('express');
const postRouter = require('./routers/postRouter');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

//routers import




app.use(express.json());
app.use('/posts', postRouter);


app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
})