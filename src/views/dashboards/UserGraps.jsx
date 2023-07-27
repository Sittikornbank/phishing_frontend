// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const data = [
  {
    title: '$48,568.20',
    avatarColor: 'success',
    subtitle: 'Total Profit',
    icon: <Icon icon='mdi:trending-up' fontSize='1.875rem' />
  },
  {
    title: '$38,453.25',
    avatarColor: 'primary',
    subtitle: 'Total Income',
    icon: <Icon icon='mdi:currency-usd' fontSize='1.875rem' />
  },
  {
    title: '$2,453.45',
    avatarColor: 'secondary',
    subtitle: 'Total Expense',
    icon: <Icon icon='mdi:poll' />
  }
]

const series = [
  {
    name: 'Product A',
    data: [29000, 22000, 25000, 18500, 29000, 20000, 34500]
  },
  {
    name: 'Product B',
    data: [0, 16000, 11000, 15500, 0, 12500, 9500]
  },
  {
    name: 'Product C',
    data: [0, 0, 0, 14000, 0, 11500, 12000]
  }
]

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const UserGraps = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 20,
        columnWidth: '35%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.secondary.main],
    grid: {
      strokeDashArray: 7,
      borderColor: theme.palette.divider,
      padding: {
        left: 0,
        bottom: -10
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022],
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    yaxis: {
      labels: {
        offsetY: 2,
        offsetX: -10,
        formatter: value => (value > 999 ? `${(value / 1000).toFixed(0)}k` : `${value}`),
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: 430,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '55%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <Grid container>
        <StyledGrid item xs={12}>
          <CardContent sx={{ height: '100%', '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
            <Typography variant='h6'>Total Profit</Typography>
            <ReactApexcharts type='bar' height={475} series={series} options={options} />
          </CardContent>
        </StyledGrid>
      </Grid>
    </Card>
  )
}

export default UserGraps
