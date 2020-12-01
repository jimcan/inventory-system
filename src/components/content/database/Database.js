import React, { useState, useEffect } from 'react'
import { add } from './data-sample'
import { firestore } from '../../../firebase/config'

export default function Database() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = firestore.collection('products')

  function getProducts() {
    setLoading(true)
    ref.onSnapshot(querySnapshot => {
      let items = []
      querySnapshot.forEach(doc => items.push(doc.data()))
      setProducts(items)
      setLoading(false)
    })
  }

  useEffect(() => {
    getProducts()
  }, [])

  function renderTableData(row, index) {
    const { id, name, unit, price, stock } = row
    return (
      <tr key={index}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{unit}</td>
        <td>{stock}</td>
        <td>{price}</td>
      </tr>
    )
  }

  return (
    <div>
      {
        loading
          ? <h3>Loading...</h3>
          : < table className='products'>
            <tbody>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Unit</td>
                <td>Price</td>
                <td>Stock</td>
              </tr>
              {
                products.map(renderTableData)
              }
            </tbody>
          </table>
      }
      <button onClick={add}>Add product</button>
    </div>
  )
}
