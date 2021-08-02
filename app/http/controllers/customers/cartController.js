function cartController() {
  return {
    index(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      //the pattern of the cart to store all the info
      // let cart = {
      //     items:{
      //         pizzaId:{item:pizzaObject,qty:0},
      //     },
      //     totalQty:0,
      //     totalPrice:0,
      // }

      //for the first time creating cart and adding basic structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;
      // Check if item doesnt exist in cart

      if (!cart.items[req.body._id]) {
        //if item doesnt exists
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQty += 1;
        cart.totalPrice += req.body.price;
      } else {
        // If item allready exists in cart
        cart.items[req.body._id].qty += 1;
        cart.totalQty += 1;
        cart.totalPrice += req.body.price;
      }
      return res.json({ totalQty: req.session.cart.totalQty});
    },
  };
}
module.exports = cartController;
