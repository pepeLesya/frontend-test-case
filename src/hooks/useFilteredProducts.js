import { useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'

export const useFilteredProducts = (searchTerm, selectedCategory, sortBy) => {
  const products = useSelector(state => state.app.products)

  return useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'price') return a.price - b.price
        return 0
      })
  }, [products, searchTerm, selectedCategory, sortBy])
}