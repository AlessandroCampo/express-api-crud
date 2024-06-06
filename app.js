const express = require('express');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

//routers import
const postRouter = require('./routers/postRouter');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/posts', postRouter);



app.use((req, res, next) => {
    res.status(404).json({ error: `Could not find route  ${req.originalUrl}` });
});

app.use(globalErrorHandler);


app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
})