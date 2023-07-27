// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const GrapDashboards = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [
      theme.palette.primary.main,
      hexToRGBA(theme.palette.primary.main, 0.7),
      hexToRGBA(theme.palette.primary.main, 0.8),
      theme.palette.customColors.trackBg
    ],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: ['Apparel', 'Electronics', 'FMCG', 'Other Sales'],
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
        customScale: 0.8,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 30,
              fontSize: '0.875rem',
              color: theme.palette.text.secondary
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              formatter: value => `${value}k`,
              color: theme.palette.text.primary
            },
            total: {
              show: true,
              fontSize: '0.875rem',
              label: 'Weekly Sales',
              color: theme.palette.text.secondary,
              formatter: value => `${value.globals.seriesTotals.reduce((total, num) => total + num)}k`
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
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
      />
      <CardContent>
        <Grid container sx={{ my: [0, 4, 1.625] }}>
          <Grid item xs={12} sm={2.4} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={220} series={[12, 25, 13, 50]} options={options} />
          </Grid>
          <Grid item xs={12} sm={2.4} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={220} series={[12, 25, 13, 50]} options={options} />
          </Grid>
          <Grid item xs={12} sm={2.4} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={220} series={[12, 25, 13, 50]} options={options} />
          </Grid>
          <Grid item xs={12} sm={2.4} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={220} series={[12, 25, 13, 50]} options={options} />
          </Grid>
          <Grid item xs={12} sm={2.4} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={220} series={[12, 25, 13, 50]} options={options} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default GrapDashboards
