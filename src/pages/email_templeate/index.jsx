import React, { useState } from 'react'

// Components import
import Email_template_Table from 'src/views/table/Email_template_Table'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import { useGetLandingPageQuery } from 'src/store/api'
import CardTemplate from 'src/views/template/CardTemplate'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DialogAdd from 'src/views/pages/email_templeate/dialogAdd'

import DialogShowUI from 'src/views/pages/email_templeate/dialogShowUI'

function Campaigns() {
  // ** State
  const [alignment, setAlignment] = useState('Active Campaign')
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const [data, setData] = useState()

  const template = useGetLandingPageQuery()
  let templateData = !template.isLoading ? template.data?.site_templates : []

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  const handleSetShow = (field, value) => {
    setData(false)
    setShow(true)
  }
  console.log(dataEdit)

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Email Template
      </Typography>
      <hr />
      <Button
        variant='contained'
        sx={{ my: 4 }}
        onClick={() => handleSetShow()}
        startIcon={<AddCircleIcon fontSize='large' />}
      >
        New Template
      </Button>
      <Grid container sx={{ my: [0, 4, 1.625] }} spacing={5}>
        {templateData?.map(data => {
          return <CardTemplate key={data.id} data={data} setData={setDataEdit} setShow={setShowEdit} />
        })}
      </Grid>
      <Card sx={{ my: 4, p: 6 }}>
        <Email_template_Table />
      </Card>
      <DialogAdd show={show} setShow={setShow} data={data} />
      <DialogShowUI show={showEdit} dataEdit={dataEdit ? dataEdit : []} setShowEdit={setShowEdit} />
    </>
  )
}

Campaigns.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Campaigns
