Products = new Mongo.Collection('products');

Meteor.methods({
    'products-create': function(product, callback){
        if (Meteor.isServer){
            check(product, {
                name: String,
                count: Number,
                unit: String,
                price: {
                    purchase_price: Number,
                    markup: Number,
                    price: Number,
                    total_amount: Number
                },
                category: String,
                sid: String
            });
            
            product.created = new Date();
            product.creator = Meteor.userId();
            product.cid = Meteor.companyId();

            var id = Products.insert(product);
        }
    },
    'products-update': function(_id, product, callback) {
        if (Meteor.isServer) {
            Products.update(_id, {$set: product})
        }
    },
    'products-remove': function(_id, callback) {
        if (Meteor.isServer) {
            Products.remove(_id)
        }
    }
});