// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { FormControl, IconButton, InputLabel, MenuItem } from '@mui/material'
import Select from 'src/@core/theme/overrides/select'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const series = [
  {
    data: [3, 0, 0, 1, 0, 0, 0, 0, 1]
  }
]

const LineChartDashboard = () => {
  // ** Hook
  const theme = useTheme()

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
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
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
      categories: [
        '08/15/23,12:25:06',
        '08/15/23,12:26:06',
        '08/15/23,12:27:06',
        '08/15/23,12:28:06',
        '08/15/23,12:29:06',
        '08/15/23,12:30:06',
        '08/15/23,12:31:06',
        '08/15/23,12:32:06',
        '08/15/23,12:33:06'
      ]
    }
  }

  return (
    <Card>
      <CardHeader
        title='Event-Timeline'
        subheader='Commercial networks & enterprises'
        // component={
        //   <Select
        //     labelId='demo-simple-select-autowidth-label'
        //     id='demo-simple-select-autowidth'
        //     // value={age}
        //     // onChange={handleChange}
        //     autoWidth
        //     label='Age'
        //   >
        //     <MenuItem value=''>
        //       <em>None</em>
        //     </MenuItem>
        //     <MenuItem value={10}>Twenty</MenuItem>
        //     <MenuItem value={21}>Twenty one</MenuItem>
        //     <MenuItem value={22}>Twenty one and a half</MenuItem>
        //   </Select>
        // }
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />{' '}
      <CardContent>
        {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id='demo-simple-select-autowidth-label'>Age</InputLabel>

        </FormControl> */}
        <ReactApexcharts type='line' height={485} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default LineChartDashboard
