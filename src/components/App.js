import React, { useState } from 'react'
import Appbar from './header/Header'
import Footer from './footer/Footer'
import Content from './content/Content';

function App() {
  const [active, setActive] = useState(0)

  return (
    <div className="app">
      <Appbar active={active} setActive={setActive} />
      <Content active={active} />
      <Footer />
    </div>
  );
}

export default App;
