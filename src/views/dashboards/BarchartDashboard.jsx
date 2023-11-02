// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { MenuItem, Select } from '@mui/material'

const BarChartDashboard = forwardRef(({ dataGrap, isLoading }) => {
  // ** States
  const [event, setEvent] = useState('send')

  // ** Hook
  const theme = useTheme()

  function ValueDataGrap(obj) {
    const values = Object.keys(obj).map(key => obj[key])

    return values
  }

  function ChangeData(e) {
    console.log(e.target.value)
    setEvent(() => e.target.value)
  }

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 6,
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
      categories: !isLoading && dataGrap?.hist[event] ? Object.keys(dataGrap.hist[event]) : [],
      labels: {
        rotate: 310,
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
    <ApexChartWrapper>
      <Card>
        <CardHeader
          title='Event '
          action={
            <Select defaultValue='send' onChange={ChangeData}>
              <MenuItem value={'send'}>Send</MenuItem>
              <MenuItem value={'open'}>Open</MenuItem>
              <MenuItem value={'click'}>Click</MenuItem>
              <MenuItem value={'submit'}>Submit</MenuItem>
              <MenuItem value={'report'}>Report</MenuItem>
            </Select>
          }
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
            series={[{ name: 'Count', data: ValueDataGrap(!isLoading && dataGrap?.hist ? dataGrap.hist[event] : []) }]}
          />
        </CardContent>
      </Card>
    </ApexChartWrapper>
  )
})

export default BarChartDashboard
