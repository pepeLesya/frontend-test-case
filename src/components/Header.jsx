import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { selectUser,setUser } from '../store/appSlice'

export default function Header() {
  const user = useSelector(selectUser)
   const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setUser({
        id: 1,
        name: 'Иван Иванов',
        email: 'ivan@example.com'
      }))
    }, 500)

    return () => clearTimeout(timer)
  }, [dispatch])

  return (
    <header className="header">
      <h1>🛒 Интернет-магазин</h1>
      <div className="user-info">
        {user ? (
          <span>Привет, {user.name}!</span>
        ) : (
          <span>Загрузка...</span>
        )}
      </div>
    </header>
  )
}