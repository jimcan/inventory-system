import React from 'react'
import './header.css'

export default function Appbar({ active, setActive }) {
    return (
        <header>
            <a
                href="#"
                className="logo"
                onClick={() => setActive(0)}
            >
                R & C Trading</a>
            <ul>
                {
                    ['Transaction', 'Database', 'Sales'].map((p, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => setActive(i)}
                            >
                                <a href="#" className={active === i ? 'active' : 'false'}>{p}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </header>
    )
}
