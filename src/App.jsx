
import { Provider } from 'react-redux'
import { store } from './store/store'

import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

import './App.css'

export default function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header/>
        <main className="main-content">
          <ProductList />
          <Cart />
        </main>
      </div>
    </Provider>
  )
}