import { Route, Routes } from 'react-router-dom'
import { Layout } from '../layout/Layout.tsx'

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  )
}

