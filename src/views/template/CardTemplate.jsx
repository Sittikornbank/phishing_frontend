import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { ButtonBase, CardActionArea } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import { id } from 'date-fns/locale'

function ConvertDate(date) {
  var created_date = new Date(date)
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var year = created_date.getFullYear()
  var month = months[created_date.getMonth()]
  var date = created_date.getDate()
  var hour = ('0' + created_date.getHours()).slice(-2)
  var min = ('0' + created_date.getMinutes()).slice(-2)
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min // final date with time, you can use this according your requirement

  return time
}

export default function CardTemplate({ data, setData, setShow }) {
  function ClickShow(e) {
    e.preventDefault()
    setData(data)
    setShow(true)
  }

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardActionArea onClick={e => ClickShow(e)}>
          <CardMedia
            sx={{ height: '14.5625rem' }}
            image={`${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_TEMPLATE_PORT}/images/${data.email_templates.image_email}`}
          />

          {/* <CardMedia
            sx={{ height: '14.5625rem' }}
            image={`${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_TEMPLATE_PORT}/images/${data.site_templates.image_site}`}
          /> */}
          <CardContent>
            <Typography variant='h6' sx={{ mb: 2 }}>
              ID: {''}
              {data.id}
            </Typography>
            <hr />
            <Typography variant='h6' sx={{ mb: 2 }}>
              {data.name}
            </Typography>

            <Typography variant='subtitle1' sx={{ mb: 2 }}>
              Modified Date : {ConvertDate(data.modified_date)}
            </Typography>
            <Typography variant='body2'>{}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
