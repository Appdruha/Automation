import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { HeaderBurger } from './components/Header-burger.tsx'
import { useRef, useState } from 'react'

export const Header = (props: { pageName: string }) => {
  const headerRef = useRef(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuButtonClick = () => {
    setAnchorEl(headerRef.current)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar ref={headerRef}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuButtonClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {props.pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      <HeaderBurger anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
    </>
  )
}
