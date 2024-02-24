import { Route, Routes } from 'react-router-dom'
import { Layout } from '../layout/Layout.tsx'
import { AuthorizationPage } from '../../pages/Authorization-page.tsx'

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="registration" element={<AuthorizationPage/>}/>
        <Route path="authorization" element={<AuthorizationPage/>}/>
      </Route>
    </Routes>
  )
}
