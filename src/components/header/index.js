import React from 'react'
import './header.css'

export default function Appbar() {
    return (
        <header>
            <a href="#" className="logo">Logo</a>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contacts</a></li>
            </ul>
        </header>
    )
}
