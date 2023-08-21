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

function calPercentage(a, total) {
  return (a / total) * 100
}

function reducePercentage() {}

const GrapDashboards = props => {
  const { dataGrap } = props
  console.log(dataGrap)

  // ** Hook
  const theme = useTheme()

  const options = (color, text, data = 0, total = 0) => ({
    stroke: { lineCap: 'round' },
    labels: [text ? text : 'Comments'],
    colors: [color ? color : theme.palette.primary.main],
    plotOptions: {
      radialBar: {
        hollow: { size: '40%' },
        track: {
          margin: 15,
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: {
            fontSize: '2rem'
          },
          value: {
            fontSize: '1rem',
            color: theme.palette.text.secondary
          },
          total: {
            show: true,
            fontWeight: 400,
            label: text ? text : 'Comments',
            fontSize: '1.125rem',
            color: theme.palette.text.primary,
            dataTotal: [data, total],

            formatter: function (w) {
              return `${this.dataTotal[0]} / ${this.dataTotal[1]}`
            }
          }
        }
      }
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30
      }
    }
  })

  return (
    <Card>
      <CardHeader
        title='Overviews'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent>
        <Grid container sx={{ my: [0, 4, 1.625] }}>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap?.sent || 0, dataGrap?.total || 0)]}
              options={options('#38f205', 'Sent', dataGrap?.sent || 0, dataGrap?.total || 0)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap?.open || 0, dataGrap?.total || 0)]}
              options={options('#fcd75b', 'Open', dataGrap?.open || 0, dataGrap?.total || 0)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap?.click || 0, dataGrap?.total || 0)]}
              options={options('#ff9d1c', 'Click', dataGrap?.click || 0, dataGrap?.total || 0)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap?.submit || 0, dataGrap?.total || 0)]}
              options={options('#8d42f5', 'Submit', dataGrap?.submit || 0, dataGrap?.total || 0)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap?.report || 0, dataGrap?.total || 0)]}
              options={options('#0565ff', 'Report', dataGrap?.report || 0, dataGrap?.total || 0)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap?.fail || 0, dataGrap?.total || 0)]}
              options={options('#ff241c', 'Failed', dataGrap?.fail || 0, dataGrap?.total || 0)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default GrapDashboards
