/* eslint-disable prettier/prettier */
import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import './animations.css'
function Index() {
  const [user, setUser] = useState({
    first_name: 'Gene Paolo',
    last_name: 'Dayandayan',
    type: 'Employee',
    email: 'EmployeeUser@email.com',
    address: 'Tuy Batangas, Philippines',
    phone: '+639123456789'
  })
  useEffect(() => {
    const listItems = document.querySelectorAll('.slide-in')
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('slide-in-visible')
      }, index * 69)
    })
  }, [user])
  return (
    <div className="w-full h-full">
      <div className="my-3 px-5">
        <h1 className="pt-5 text-2xl lg:text-4xl font-semibold slide-in-down-visible">
          {/* Hello, {user.name}! */}
          Account Details
        </h1>
        <div className="w-full h-fit rounded-md">
          <label className="slide-in-from-right" name="first_name">
            First name
          </label>
          <TextField
            className="slide-in-down-visible"
            fullWidth
            id="outlined-basic"
            variant="outlined"
            placeholder="Ex. John"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <label className="slide-in-from-right">Last name</label>
          <TextField
            className="slide-in-down-visible"
            fullWidth
            id="outlined-basic"
            variant="outlined"
            placeholder="Ex. Smith"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <label className="slide-in-from-right">Username</label>
          <TextField
            fullWidth
            className="slide-in-down-visible"
            id="outlined-basic"
            variant="outlined"
            placeholder="Ex. Johndoe123"
          />
          <label className="slide-in-from-right">Email Address</label>
          <TextField
            fullWidth
            className="slide-in-down-visible"
            id="outlined-basic"
            variant="outlined"
            placeholder="JohnSmith@example.com"
          />
          <label className="slide-in-from-right">Age</label>
          <TextField
            className="slide-in-down-visible"
            fullWidth
            type="number"
            id="outlined-basic"
            variant="outlined"
            placeholder="Must be more than 18 years old..."
          />
          <label className="slide-in-from-right">Permanent Address</label>
          <TextField
            className="slide-in-down-visible"
            fullWidth
            id="outlined-basic"
            variant="outlined"
            placeholder="Ex. 1234 Main St. New York, NY 10001"
          />
          <div className="w-full flex gap-x-5">
            <Button
              className="slide-in-from-bottom"
              sx={{ marginTop: '5px' }}
              padding={'normal'}
              variant="outlined"
              fullWidth
            >
              Save Changes
            </Button>
            <Button
              className="slide-in-from-bottom"
              sx={{ marginTop: '5px' }}
              padding={'normal'}
              variant="outlined"
              color="error"
              fullWidth
            >
              Request Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
