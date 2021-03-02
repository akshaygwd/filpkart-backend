const express = require('express');
const app = express();
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
env.config();

//mogodb connection

//mongodb+srv://akahunter:<password>@cluster0.u9g2l.mongodb.net/<dbname>?retryWrites=true&w=majority

const authRoutes = require('./routes/auth');
const adminauthRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');

mongoose.connect(`mongodb+srv://akahunter:${process.env.MONGO_DB_PASSWORD}@cluster0.u9g2l.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected !!');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')))
app.use('/api', authRoutes);
app.use('/api', adminauthRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello from server'
    })
})

app.post('/data', (req, res, next) => {
    return res.status(200).json({
        message: req.body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
});