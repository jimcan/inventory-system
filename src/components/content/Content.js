import React from 'react'
import Transaction from './transaction/Transaction'
import Database from './database/Database'
import Sales from './sales/Sales'

export default function Content({ active }) {
  switch (active) {
    case 0:
      return (
        <div className="content">
          <Transaction />
        </div>
      )
    case 1:
      return (
        <div className="content">
          <Database />
        </div>
      )
    case 2:
      return (
        <div className="content">
          <Sales />
        </div>
      )
    default:
      return (
        <div className="content">
          <Transaction />
        </div>
      )
  }
}
