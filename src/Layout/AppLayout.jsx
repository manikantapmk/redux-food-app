import React from 'react'

const AppLayout = ({ Header, Footer, children }) => {
  return (
    <div>
      <header>{Header}</header>
      <main className='min-h-lvh'>{children}</main>
      <footer>{Footer}</footer>
    </div>
  )
}

export default AppLayout