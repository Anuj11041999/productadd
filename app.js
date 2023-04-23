const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller/main');
const cors = require('cors');

const app = express();
const adminRoutes = require('./routes/adminRoutes');
const sequelize = require('./util/database');

app.use(cors());
app.use(bodyParser.json({extended:false}));
app.get('admin/', controller.getProducts);
app.post('admin/add',controller.addProduct);

sequelize
    .sync()
    .then(result=>{
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);
    })

