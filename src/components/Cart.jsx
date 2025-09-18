
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCart,
  selectCartCount,
  selectTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart
} from '../store/appSlice'

export default function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  const cartCount = useSelector(selectCartCount)
  const totalPrice = useSelector(selectTotalPrice)

  const [isOpen, setIsOpen] = useState(false)
const [isProcessing, setIsProcessing] = useState(false)



const handleRemoveItem = (id) => {
  if (window.confirm('Удалить товар из корзины?')) {
    dispatch(removeFromCart(id))
  }
}
  const handleUpdateQuantity = (id, quantity) => {
  if (quantity < 1) return 
  dispatch(updateQuantity({ id, quantity }))
}


  const handleCheckout = () => {
    if (cart.length === 0 || isProcessing) return
    setIsProcessing(true)
    setTimeout(() => {
      alert('Заказ оформлен!')
      dispatch(clearCart())
      setIsProcessing(false)
      setIsOpen(false)
    }, 1000)
    return () => clearTimeout(timer)
  }

  return (
    <div className="cart">
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        Корзина ({cartCount})
      </button>

      {isOpen && (
        <div>
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                    Удалить
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-footer">
            <div className="total">Итого: ${totalPrice}</div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cart.length === 0 || isProcessing}
            >
              {isProcessing ? 'Оформляем...' : 'Оформить заказ'}
            </button>
          </div>
        </div>
      </div>
      )}
        
    </div>
  )
  
}