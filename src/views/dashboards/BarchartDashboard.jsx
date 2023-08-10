// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const BarChartDashboard = () => {
  // ** States
  const [endDate, setEndDate] = useState(null)
  const [startDate, setStartDate] = useState(null)

  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '30%',
        horizontal: false,
        startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: ['MON, 11', 'THU, 14', 'FRI, 15', 'MON, 18', 'WED, 20', 'FRI, 21', 'MON, 23'],
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    }
  }

  const handleOnChange = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Card>
      <CardHeader
        title='Balance'
        subheader='Commercial networks & enterprises'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts
          type='bar'
          height={485}
          options={options}
          series={[{ data: [700, 350, 480, 600, 210, 550, 150] }]}
        />
      </CardContent>
    </Card>
  )
}

export default BarChartDashboard
