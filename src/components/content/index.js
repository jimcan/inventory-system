import React from 'react'
import './content.css'
import Transaction from './transaction'
import Database from './database'
import Sales from './sales'

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
