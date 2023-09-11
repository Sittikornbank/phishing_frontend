// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { FormControl, IconButton, InputLabel, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'

const LineChartDashboard = ({ dataGrap, isLoading }) => {
  const [event, setEvent] = useState('send')

  // ** Hook
  const theme = useTheme()
  console.log(isLoading)
  console.log(!isLoading ? dataGrap?.ts[event] : [])

  function ChangeData(e) {
    console.log(e.target.value)
    setEvent(() => e.target.value)
  }

  const options = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    colors: ['#9155FD'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#9155FD'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart'>
          <span style="color:black; padding: 1rem">${data.series[data.seriesIndex][data.dataPointIndex]}</span>
        </div>`
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
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: !isLoading ? dataGrap?.ts.x_axis : []
    }
  }

  return (
    <Card>
      <CardHeader
        title='Event-Timeline'
        subheader='Commercial networks & enterprises'
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
      />{' '}
      <CardContent>
        <ReactApexcharts
          type='line'
          height={485}
          options={options}
          series={[{ data: !isLoading ? dataGrap?.ts[event] : [] }]}
        />
      </CardContent>
    </Card>
  )
}

export default LineChartDashboard
