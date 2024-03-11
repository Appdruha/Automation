import { ReactNode } from 'react'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { Navigate } from 'react-router-dom'
import { REGISTRATION_ROUTE } from '../../consts/routes.ts'

export const ProtectedRoute = (props: { children: ReactNode }) => {
  const { isAuthorized } = useAppSelector((state) => state.userReducer)

  if (!isAuthorized) {
    return <Navigate to={REGISTRATION_ROUTE} replace />
  }

  return props.children
}