/* eslint-disable prettier/prettier */
import { BarChart } from '@mui/x-charts/BarChart'
import { Grid2 as Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import './animations_home.css'
export default function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027'
    })
  }))

  return (
    <div className="w-full h-full">
      <div className="flex flex-col mx-5 pb-5">
        <div className="my-3">
          <h1 className="pt-5 text-2xl lg:text-4xl font-semibold slide-in-down-visible">Home</h1>
        </div>
        <div className="flex my-5 slide-in-from-right">
          <Item className="w-full">
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] }
              ]}
              height={300}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </Item>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="w-full h-full slide-in-from-right">
            <Item className="flex flex-col items-center justify-center whitespace-pre select-none">
              <p className="text-lg flex self-start">Product sold within a month</p>
              <p className="text-blue-900 text-[100px]">52</p>
            </Item>
          </div>
          <div className="w-full h-full slide-in-from-left">
            <Item className="flex flex-col items-center justify-center whitespace-pre select-none">
              <p className="text-lg flex self-start">Product sold within the Year</p>
              <p className="text-blue-900 text-[100px]">5052</p>
            </Item>
          </div>
        </div>
      </div>
    </div>
  )
}
