import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { Footer } from '../../components/footer/Footer.tsx'

export const Layout = () => {
  return (
    <>
      <Container sx={{border: 1, borderColor: 'black', height: '80vh', width: '94vw'}}>
        <main>
          <Outlet />
        </main>
      </Container>
      <Footer/>
    </>
  )
}
