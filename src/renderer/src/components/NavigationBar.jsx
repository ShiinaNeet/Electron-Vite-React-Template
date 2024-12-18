/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MenuIcon from '@mui/icons-material/Menu'

const NavigationBar = () => {
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
    if (isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken')
      window.api.setAuthToken(accessToken)
    }
  }, [isAuthenticated])
  const DrawerList = (
    <Box
      sx={{
        // width: { xs: "100%", sm: "50%" },
        // minWidth: "250px",
        width: 1 / 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div>
        <List>
          <ListItem>
            <ListItemButton className="hover-item" onClick={() => navigate('/account')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Accounts'} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton className="hover-item" onClick={() => navigate('/home')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              className="hover-item hover:bg-indigo-200"
              onClick={() => navigate('/products')}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Products'} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <div>
        <Divider />
        <List>
          {isAuthenticated && (
            <ListItem onClick={() => logout()} className="">
              <ListItemButton className="hover-item ">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={'LOGOUT'} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </div>
    </Box>
  )
  return (
    <>
      <nav className="h-[50px] md:h-[75px] w-screen bg-blue-700 px-2 md:justify-between flex items-center justify-center text-white sticky shadow-md">
        <div className="md:flex px-2 hidden">
          <label className="flex justify-center self-center font-bold text-xs sm:text-sm md:text-xl lg:text-2xl">
            PRODUCTION INC.
          </label>
        </div>
        <div className="h-[100px] flex gap-x-5 items-center flex-wrap mx-7">
          {/* <Button>
            <Link
              className="p-2 hover:bg-blue-600 hover:rounded-md hover:cursor-pointer"
              to="/products"
            >
              <p className="text-white">Products</p>
            </Link>
          </Button> */}

          <Button
            className="p-2 hover:bg-blue-600 hover:rounded-md hover:cursor-pointer"
            onClick={toggleDrawer(true)}
          >
            {/* <p className="text-white">Open drawer</p> */}
            <MenuIcon className="text-white" />
          </Button>
        </div>
      </nav>
      <div>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </>
  )
}

export default NavigationBar
