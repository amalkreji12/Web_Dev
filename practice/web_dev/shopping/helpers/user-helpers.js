var db = require('../config/connection');
var collections = require('../config/collections');
const bcrypt = require('bcrypt');
const { response } = require('express');
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
                    resolve(true);
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
                }).catch((error)=>{
                    reject(error)
                })
        })
    }





};


