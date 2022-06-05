import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems } = cart;
 
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const freight_value = cartItems.reduce((a,c) => (parseInt(a) + parseInt(c.qty)*10),0)
  const freightPrice = freight_value >= 250 ? 0 : freight_value;
  const totalPrice = itemsPrice + freightPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    console.log('error?')
    console.log(cartItems,itemsPrice,freightPrice,totalPrice)
    dispatch(createOrder({
      orderItems: cartItems, itemsPrice, freightPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">

        <div>
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
                  O carrinho está vaio
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
                        Qtd: {item.qty}
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

      
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Realizar pedido</button>
          </li>
          <li>
            <h3>Resumo do pedido</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Frete</div>
            <div>${freightPrice}</div>
          </li>
          <li>
            <div>Preço Total</div>
            <div>${totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;