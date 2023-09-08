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

function calPercentage(a, total) {
  return ((a / total) * 100).toFixed(2)
}

const GrapTotalDashboards = ({ dataGrap }) => {
  // ** Hook
  const theme = useTheme()
  const open = dataGrap.open ? dataGrap.open : 0
  const click = dataGrap.click ? dataGrap.click : 0
  const submit = dataGrap.submit ? dataGrap.submit : 0
  const data_grap = [open, click, submit]

  console.log(dataGrap)

  const total = data_grap.reduce((a, b) => a + b, 0)

  const options = {
    stroke: { width: 0 },
    labels: ['Open', 'Click', 'Submit'],
    colors: ['#fcd75b', '#ff9d1c', '#8d42f5'],
    dataLabels: {
      enabled: true,
      formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: val => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Operational',
              formatter: () => '31%',
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Total Status'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent>
        <Grid container sx={{ my: [0, 1, 0.625] }}>
          <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={400} series={data_grap} options={options} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3, '& svg': { color: 'primary.main' } }}>
                <Icon icon='solar:graph-up-line-duotone' />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2'>Total Status</Typography>
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
                <Typography sx={{ fontWeight: 600 }}>Percent: {calPercentage(dataGrap.open, total)} %</Typography>
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
                <Typography sx={{ fontWeight: 600 }}>Percent: {calPercentage(dataGrap.click, total)} %</Typography>
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
                <Typography sx={{ fontWeight: 600 }}>Percent: {calPercentage(dataGrap.submit, total)} %</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default GrapTotalDashboards
