import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=placeorder");
  }


  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Carrinho
          </h3>
          <div>
            Preço
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Carrinho está vazio
          </div>
            :
            cartItems.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qtd:
                  <input value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                    </input>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                      Remover
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} +
         $ {cartItems.reduce((a, c) => (parseInt(a) + parseInt(c.qty)*10), 0) >= 250 ? 'frete grátis' : cartItems.reduce((a, c) => (parseInt(a) + parseInt(c.qty)*10) + ' frete', 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Ir para o Checkout
      </button>

    </div>

  </div>
}

export default CartScreen;