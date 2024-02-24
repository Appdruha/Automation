import { Menu, MenuItem } from '@mui/material'

export const HeaderBurger = (props: {anchorEl: HTMLElement | null, isMenuOpen: boolean, handleCloseMenu: () => void}) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.isMenuOpen}
      onClose={props.handleCloseMenu}
      sx={{
        left: '-16px'
      }}
    >
      <MenuItem onClick={props.handleCloseMenu}>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  )
}