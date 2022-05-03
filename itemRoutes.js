const express = require("express");
const router = new express.Router();
const Item = require("./items")


// GET: Render list of shopping items

router.get('', (req,res,next) =>{
    try{
        return res.json({items: Item.allItems()})
    } catch(err){
        return next(err)
    }
});

// POST: add item to shopping list

router.post('', (req,res,next) =>{
    try{
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({item: newItem});
    } catch(err){
        return next(err);
    }
});

// GET: dispplay single items name and price

router.get("/:name", (req,res,next) =>{
    try{
    let singleItem = Item.find(req.params.name);
    return res.json({item:singleItem});
    } catch(err){
        return next(err);
    }
});

//PATCH: Modify a item

router.patch("/:name",(req,res,next) =>{
    try{
        let updateItem = Item.update(req.params.name, req.body.price);
        return res.json({item:updateItems});
    }catch(err){
        return next(err);
    }
});

//DELETE: delete item
router.delete("/:nane",(req,res,next) =>{
    try{
        Item.delete(req.params.name);
        return res.json({message: "Delete"});
    }catch(err){
        return next(err);
    }
});

module.exports = router;
