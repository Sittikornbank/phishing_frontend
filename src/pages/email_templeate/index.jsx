import React, { useState } from 'react'

// Components import
import Email_template_Table from 'src/views/table/Email_template_Table'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import { useGetEmailTemplatesQuery } from 'src/store/api'
import CardTemplate from 'src/views/template/CardTemplate'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DialogAdd from 'src/views/pages/email_templeate/dialogAdd'

import DialogShowUI from 'src/views/pages/email_templeate/dialogShowUI'

function EmailTemplates() {
  // ** State
  const [show, setShow] = useState(false)
  const [data, setData] = useState()
  const template = useGetEmailTemplatesQuery()

  const handleSetShow = (field, value) => {
    setData(false)
    setShow(true)
  }

  const refrechedData = () => template.refetch()

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
      <Card sx={{ my: 4, p: 6 }}>
        <Email_template_Table template={template} />
      </Card>
      <DialogAdd show={show} setShow={setShow} data={data} refetch={refrechedData} />
    </>
  )
}

EmailTemplates.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default EmailTemplates
