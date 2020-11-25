import React, { useState } from 'react'
import Appbar from './header'
import Footer from './footer'
import Content from './content';

function App() {
  const [active, setActive] = useState(0)

  console.log(active);
  return (
    <div className="app">
      <Appbar active={active} setActive={setActive} />
      <Content active={active} />
      <Footer />
    </div>
  );
}

export default App;
