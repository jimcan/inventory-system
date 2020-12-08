import React from 'react'

export default function Spacer({ width, grow }) {
  return (
    <div style={{ width: width, flexGrow: grow && 1 }}></div>
  )
}

