import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { Footer } from '../../components/footer/Footer.tsx'
import { Header } from '../../modules/header'

export const Layout = () => {
  return (
    <>
      <Header pageName='Главная'/>
      <Container sx={{ border: 1, borderColor: 'black', height: '130vh', width: '94vw' }}>
        <main>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </>
  )
}
