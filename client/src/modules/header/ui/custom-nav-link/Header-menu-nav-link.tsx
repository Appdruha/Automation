import { NavLink } from 'react-router-dom'

export const HeaderMenuNavLink = (props: { to: string; children: string }) => {
  return (
    <NavLink
      to={props.to}
      className="mediumFont"
      style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
    >
      {props.children}
    </NavLink>
  )
}
