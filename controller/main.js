const Product = require('../models/product');

exports.getProducts = async (req,res,next)=>{
    Product.findAll()
        .then(products=>{
            console.log('fetched');
            res.json(products);
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.addProduct = async (req,res,next)=>{
    try{
        const name = req.body.name;
        const price = req.body.price; 
        await Product.create({
            name:name,
            price:price
        })
        res.json({name,price})
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteExpense = (req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            console.log('ID missing');
            return res.status(400).json({err:'ID missing'});
        }
        const id = req.params.id
        Product.destroy({where: {id:id}}).then(result=>{
            res.sendStatus(200);
        }).catch(err=>{
            console.log(err);
        });
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    
}