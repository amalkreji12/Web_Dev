var db = require('../config/connection');
var collections = require('../config/collections');
const bcrypt = require('bcrypt');
const { response } = require('express');
const { resolve } = require('express-hbs/lib/resolver');
var objectId = require("mongodb").ObjectId;


module.exports = {
    doSignUP(userData) {
        return new Promise(async function (resolve, reject) {
            userData.password = await bcrypt.hash(userData.password, 10);
            db.getDb().collection(collections.USER_COLLECTION).insertOne(userData).then((data) => {
                //console.log(userData);   
                resolve(userData);
            })
        });
    },

    doLogin(userData) {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};
            let user = await db.getDb().collection(collections.USER_COLLECTION).findOne({ email: userData.email });
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log('Login Success');
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    } else {
                        console.log('Login Failed / Incorrect password');
                        resolve({ status: false });
                    }
                })
            } else {
                console.log('Login Failed');
                resolve({ status: false });
            }
        })
    },

    addToCart(proId, userId) {
        let proObj = {
            item: new objectId(proId),
            quantity: 1
        }
        return new Promise(async (resolve, reject) => {
            let usercart = await db.getDb().collection(collections.CART_COLLECTION).findOne({ user: new objectId(userId) });
            if (usercart) {
                let proExtist = usercart.products.findIndex(product => product.item == proId);
                console.log(proExtist);
                if (proExtist != -1) {
                    db.getDb().collection(collections.CART_COLLECTION).updateOne({ user: new objectId(userId), 'products.item': new objectId(proId) },
                        {
                            $inc: { 'products.$.quantity': 1 }
                        }
                    ).then(() => {
                        resolve()
                    })
                } else {
                    db.getDb().collection(collections.CART_COLLECTION).updateOne({ user: new objectId(userId) },
                        {

                            //$push: { products: new objectId(proId) },
                            $push: { products: proObj }

                        }
                    ).then((response) => {
                        resolve();
                    })
                }


            } else {
                let cartObj = {
                    user: new objectId(userId),
                    //products: [new objectId(proId)],
                    products: [proObj]
                }
                db.getDb().collection(collections.CART_COLLECTION).insertOne(cartObj).then((response) => {
                    resolve();
                })
            }
        })
    },

    getCartProducts(userId) {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.getDb().collection(collections.CART_COLLECTION).aggregate([
                {
                    $match: { user: new objectId(userId) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: collections.PRODUCT_COLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, product: { $arrayElemAt: ['$product', 0] }
                    }
                }
                // {
                //     $lookup: {
                //         from: collections.PRODUCT_COLLECTION,
                //         let: { proList: '$products' },
                //         pipeline: [
                //             {
                //                 $match: {
                //                     $expr: {
                //                         $in: ['$_id', '$$proList']
                //                     }
                //                 }
                //             }
                //         ],
                //         as: 'cartItems'
                //     }
                // }

            ]).toArray();
            //console.log(cartItems);

            if (cartItems.length > 0) {
                //resolve(cartItems[0].cartItems);
                resolve(cartItems)
            } else {
                resolve([]); // Cart is empty or no matching products found
            }
            //resolve(cartItems[0].cartItems);
        })
    },

    getCartCount(userId) {
        return new Promise(async (resolve, reject) => {
            let count = 0
            let cart = await db.getDb().collection(collections.CART_COLLECTION).findOne({ user: new objectId(userId) });
            if (cart) {
                count = cart.products.length;
            }
            resolve(count);
        })
    },

    changeProductCount(details) {
        details.count = parseInt(details.count);
        //details.quantity = parseInt(details.quantity);
        return new Promise((resolve, reject) => {
            if (details.count == -1 && details.quantity == 1) {
                db.getDb().collection(collections.CART_COLLECTION).updateOne({ _id: new objectId(details.cart) },
                    {
                        $pull: { products: { item: new objectId(details.product) } }
                    }
                ).then((response) => {
                    resolve({ removeProduct: true })
                })

            } else {
                db.getDb().collection(collections.CART_COLLECTION).updateOne({ _id: new objectId(details.cart), 'products.item': new objectId(details.product) },
                    {
                        $inc: { 'products.$.quantity': details.count }
                    }
                ).then((response) => {
                    //console.log(response);
                    resolve({status:true});
                })
            }

        })
    },

    deleteCartProduct(details) {
        return new Promise((resolve, reject) => {
            db.getDb().collection(collections.CART_COLLECTION).updateOne({ _id: new objectId(details.cart) },
                {
                    $pull: { products: { item: new objectId(details.product) } }
                }
            ).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    getTotalAmount(userId) {
        return new Promise(async (resolve, reject) => {
            let total = await db.getDb().collection(collections.CART_COLLECTION).aggregate([
                {
                    $match: { user: new objectId(userId) }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: collections.PRODUCT_COLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, product: { $arrayElemAt: ['$product', 0] }
                    }
                },
                {
                    $group:{
                        _id:null,
                        total:{$sum:{$multiply:['$quantity',{$toInt:'$product.price'}]}}
                    }
                }

            ]).toArray();
            if (total.length > 0) {
                //resolve(cartItems[0].cartItems);
                resolve(total[0].total)
            } else {
                resolve([]); // Cart is empty or no matching products found
            }
           
            // console.log(total[0].total);
            // console.log(total);
            
            
           // resolve(total[0].total);
        })
    },

    


    placeOrder(details,products,total){
        return new Promise((resolve,reject)=>{
            //console.log(details,products,total);
            function generateOrderId(){
                return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
            }

            let status=details.paymentMethod === 'COD'?'placed':'pending'
            const orderId = generateOrderId();
            let orderObj = {
                deliveryDetails:{
                    mobile:details.mobile,
                    address:details.address,
                    pincode:details.pin
                },
                userId:new objectId(details.userId),
                paymentMethod:details.paymentMethod,
                products:products,
                totalAmount:total,
                status:status,
                date:new Date()  ,
                orderId:orderId
            }
            db.getDb().collection(collections.ORDER_COLLECTION).insertOne(orderObj).then((response)=>{
                db.getDb().collection(collections.CART_COLLECTION).deleteOne({user:new objectId(details.userId)})
                resolve()
            })
            
        })
    },

    getCartProductList(userId){
        return new Promise(async(resolve,reject)=>{
            let cart = await db.getDb().collection(collections.CART_COLLECTION).findOne({user:new objectId(userId)})
            // console.log(cart)
            // console.log(cart.products);
            resolve(cart.products)
        })
    },

    getUserOrders(userId){
        return new Promise(async(resolve,reject)=>{
            console.log(userId)
            let orders= await db.getDb().collection(collections.ORDER_COLLECTION)
            .find({userId:new objectId(userId)}).toArray();
            resolve(orders);
        })
    },

    getOrderProducts(orderId){
        return new Promise(async(resolve,reject)=>{
            let orderItems = await db.getDb().collection(collections.ORDER_COLLECTION).aggregate([
                {
                    $match:{_id:new objectId(orderId)},
                },
                {
                    $unwind:'$products',
                },
                {
                    $project:{
                        item:'$products.item',
                        quantity:'$products.quantity'
                    }
                },
                {
                    $lookup:{
                        from:collections.PRODUCT_COLLECTION,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },
                {
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                    }
                }

            ]).toArray();
            resolve(orderItems);
            //console.log(orderItems);
        })
    },

    getTotalAmountOrders(orderId){
        return new Promise(async(resolve,reject)=>{
            //console.log(orderId)
            let orders= await db.getDb().collection(collections.ORDER_COLLECTION)
            .find({_id:new objectId(orderId)}).toArray();
            resolve(orders)
            // resolve(orders[0].totalAmount);
            // console.log(orders[0].totalAmount);
            
        })
    },







};


