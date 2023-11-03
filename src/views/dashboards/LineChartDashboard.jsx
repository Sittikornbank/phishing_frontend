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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'

import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

const LineChartDashboard = ({ dataGrap, isLoading }) => {
  const [event, setEvent] = useState('send')

  // ** Hook
  const theme = useTheme()

  const [value, setValue] = useState('')

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
      <CardContent>
        <Box mt={4} mx={4} display='flex'>
          <Box>
            <Typography variant='h4'> Event-Timeline</Typography>
            {/* <Typography>Commercial networks & enterprises</Typography> */}
          </Box>
          <Box flexGrow={1} />
          <Box mr={8}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={value}
                label='Status'
                onChange={e => {
                  setValue(e.target.value)
                }}
              >
                <MenuItem value={'send'}>send</MenuItem>
                <MenuItem value={'open'}>open</MenuItem>
                <MenuItem value={'click'}>click</MenuItem>
                <MenuItem value={'submit'}>submit</MenuItem>
                <MenuItem value={'report'}>report</MenuItem>
              </Select>
            </FormControl>{' '}
          </Box>
        </Box>
      </CardContent>
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
