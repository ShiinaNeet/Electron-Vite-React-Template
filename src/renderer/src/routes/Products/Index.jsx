/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  Button,
  Box
} from '@mui/material'
import './animations.css'
import CircularProgress from '@mui/material/CircularProgress'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

function Index() {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const listItems = document.querySelectorAll('.slide-in')
    listItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('slide-in-visible')
      }, index * 69)
    })
  }, [rows])

  const addProduct = () => {
    const rand = () => Math.floor(Math.random() * 100)
    const newProduct = {
      id: 52,
      title: 'test add',
      price: rand(),
      description: 'test add',
      category: 'jewelery',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      rating: {
        rate: 5.0,
        count: rand()
      }
    }
    setRows((prevRows) => [...prevRows, newProduct])
    const lastProductElement = document.querySelector('.bottom-div')
    if (lastProductElement) {
      lastProductElement.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const getData = async () => {
    setIsLoading(true)
    try {
      // const response = await window.api.request('/products', {
      //   method: 'GET'
      // })
      const response = await window.api.request('/user/paginated/student?skip=0&limit=10', {
        method: 'GET'
      })
      // setRows(response.data) // Use the response directly since it's already resolved
      // console.log('Products Response:', response)
    } catch (error) {
      console.error('Error fetching data:', error.message || error) // Log the error message or full object
      if (error.response) {
        console.error('Response data:', error.response)
      }
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getData()
    // fetch('https://fakestoreapi.com/products')
    //   .then((response) => response.json())
    //   .then((data) => setRows(data))
    //   .catch((error) => console.error('Error fetching data:', error))
  }, [])
  return (
    <div className="flex flex-col px-5 mb-5 h-fit">
      <h1 className="pt-5 text-2xl lg:text-4xl font-semibold slide-in-down-visible select-none">
        Products
      </h1>
      <button
        onClick={addProduct}
        className="sticky top-2 p-2 hover:bg-blue-100 hover:text-blue-500 text-blue-400 z-10 slide-in-down-visible"
      >
        Add new product
      </button>
      {window.outerWidth < 700 ? (
        <div className="text-black-500">
          {rows.map((row, idx) => (
            <List key={idx} className="slide-in">
              <p> {idx + 1 + '. ' + row.title}</p>
            </List>
          ))}
        </div>
      ) : isLoading ? (
        <div className="h-[100px] flex items-center justify-center ">
          <CircularProgress />
          <h1 className="p-2">Loading...</h1>
        </div>
      ) : (
        <div className="w-min-[600px]">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-center">Image</th>
                <th className="text-center">Item</th>
                <th className="text-center">Category</th>
                <th className="text-center">Price</th>
                <th className="text-center">Rating</th>
              </tr>
            </thead>
            <tbody>
              {rows.length == 0
                ? 'Loading'
                : rows.map((row) => (
                    <tr
                      key={row.id}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      className="slide-in-down-visible"
                    >
                      <TableCell align="left">
                        <img src={row.image} alt="image" height={'50px'} width={'50px'} />
                      </TableCell>
                      <TableCell size="small" align="center" className="select-all">
                        {row.title}
                      </TableCell>
                      <TableCell align="center" className="select-all">
                        {row.category}
                      </TableCell>
                      <TableCell align="center" className="select-all">
                        {row.price}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="select-all"
                      >{`${row.rating.rate} (${row.rating.count})`}</TableCell>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="bottom-div my-20"></div>
    </div>
  )
}

export default Index
