import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <header style={{background: 'blue', width: '100vw'}}>111</header>
      <main>
        <Outlet />
      </main>
      <footer style={{background: 'red', width: '100vw'}}>222</footer>
    </>
  )
}
