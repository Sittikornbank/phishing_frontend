// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

function calPercentage(a, total) {
  return ((a / total) * 100).toFixed(2)
}

const GrapTotalDashboards = ({ dataGrap }) => {
  // ** Hook
  const theme = useTheme()

  console.log(dataGrap)

  const data_grap = [dataGrap.open, dataGrap.click, dataGrap.submit]

  const total = data_grap.reduce((a, b) => a + b, 0)

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: ['#fcd75b', '#ff9d1c', '#8d42f5'],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: ['Open', 'Click', 'Submit'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 25,
              fontSize: '0.875rem',
              color: theme.palette.text.secondary
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              formatter: value => value,
              color: theme.palette.text.primary
            },
            total: {
              show: true,
              fontSize: '0.875rem',
              label: 'Total',
              color: theme.palette.text.secondary,
              formatter: value => `${value.globals.seriesTotals.reduce((total, num) => total + num)}`
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Sales Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent>
        <Grid container sx={{ my: [0, 1, 0.625] }}>
          <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={220} series={data_grap} options={options} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, '& svg': { color: 'primary.main' } }}>
                <Icon icon='solar:graph-up-line-duotone' />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2'>Number of Sales</Typography>
                <Typography variant='h6'>{total}</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
            <Grid container>
              <Grid item xs={6} sx={{ mb: 4 }}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1.5, fontSize: '0.75rem', color: '#fcd75b' }
                  }}
                >
                  <Icon icon='mdi:circle' />
                  <Typography variant='body2'>Open</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>Count: {dataGrap.open}</Typography>
                <Typography sx={{ fontWeight: 600 }}>Percent: {calPercentage(dataGrap.open, total)}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 4 }}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1.5, fontSize: '0.75rem', color: '#ff9d1c' }
                  }}
                >
                  <Icon icon='mdi:circle' />
                  <Typography variant='body2'>Click</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>Count: {dataGrap.click}</Typography>
                <Typography sx={{ fontWeight: 600 }}>Percent: {calPercentage(dataGrap.click, total)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 1.5, fontSize: '0.75rem', color: '#8d42f5' }
                  }}
                >
                  <Icon icon='mdi:circle' />
                  <Typography variant='body2'>Submit</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>Count: {dataGrap.submit}</Typography>
                <Typography sx={{ fontWeight: 600 }}>Percent: {calPercentage(dataGrap.submit, total)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default GrapTotalDashboards
