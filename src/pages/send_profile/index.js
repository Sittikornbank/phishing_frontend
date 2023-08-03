// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import TableBasic from 'src/views/table/mui/TableBasic'
import TableDense from 'src/views/table/mui/TableDense'
import TableSpanning from 'src/views/table/mui/TableSpanning'
import TableCustomized from 'src/views/table/mui/TableCustomized'
import TableSortSelect from 'src/views/table/mui/TableSortSelect'
import TableCollapsible from 'src/views/table/mui/TableCollapsible'
import TableSendProfile from 'src/views/pages/send-profile/TableSendProfile'
import { Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useState } from 'react'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const SendProfile = () => {
  const [show, setShow] = useState(false)
  return (
    <Grid container spacing={6}>
      <PageHeader title={<Typography variant='h3'>Sending Profiles</Typography>} />
      <Grid item xs={12}>
        <Button variant='contained' onClick={() => setShow(true)}>
          <Icon icon='mdi:add-bold' /> New Profile
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableSendProfile show={show} setShow={setShow} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default SendProfile
