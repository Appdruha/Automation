import { Menu, MenuItem } from '@mui/material'
import { HeaderMenuNavLink } from '../ui/custom-nav-link/Header-menu-nav-link.tsx'

export const HeaderBurger = (props: {
  anchorEl: HTMLElement | null
  isMenuOpen: boolean
  handleCloseMenu: () => void
}) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isMenuOpen}
      onClose={props.handleCloseMenu}
      sx={{
        left: '-16px',
      }}
    >
      <MenuItem onClick={props.handleCloseMenu}>
        <HeaderMenuNavLink to="/">Главная</HeaderMenuNavLink>
      </MenuItem>
      <MenuItem onClick={props.handleCloseMenu}>
        <HeaderMenuNavLink to="/registration">Регистрация</HeaderMenuNavLink>
      </MenuItem>
      <MenuItem onClick={props.handleCloseMenu}>
        <HeaderMenuNavLink to="/authorization">Авторизация</HeaderMenuNavLink>
      </MenuItem>
    </Menu>
  )
}