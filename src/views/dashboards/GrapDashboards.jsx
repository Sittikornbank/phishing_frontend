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
              series={[calPercentage(dataGrap.sent, dataGrap.total)]}
              options={options('#38f205', 'Sent', dataGrap.sent, dataGrap.total)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap.open, dataGrap.total)]}
              options={options('#fcd75b', 'Open', dataGrap.open, dataGrap.total)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap.click, dataGrap.total)]}
              options={options('#ff9d1c', 'Click', dataGrap.click, dataGrap.total)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap.submit, dataGrap.total)]}
              options={options('#8d42f5', 'Submit', dataGrap.submit, dataGrap.total)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap.report, dataGrap.total)]}
              options={options('#0565ff', 'Report', dataGrap.report, dataGrap.total)}
            />
          </Grid>
          <Grid item xs={6} sm={4} md={2} sx={{ mb: [3, 0] }}>
            <ReactApexcharts
              type='radialBar'
              height={240}
              series={[calPercentage(dataGrap.fail, dataGrap.total)]}
              options={options('#ff241c', 'Failed', dataGrap.fail, dataGrap.total)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default GrapDashboards
