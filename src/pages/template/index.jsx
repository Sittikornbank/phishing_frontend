import React, { useState } from 'react'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import { useGetTemplateQuery } from 'src/store/api'
import CardTemplate from 'src/views/template/CardTemplate'
import DialogShowUI from 'src/views/pages/email_templeate/dialogShowUI'

function Template() {
  const template = useGetTemplateQuery()
  let templateData = !template.isLoading ? template.data?.templates : []
  const [showEdit, setShowEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState({})

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Template
      </Typography>
      <hr />
      <Grid container sx={{ my: [0, 4, 1.625] }} spacing={5}>
        {templateData?.map(data => {
          return <CardTemplate key={data.id} data={data} setData={setDataEdit} setShow={setShowEdit} />
        })}
      </Grid>
      <DialogShowUI show={showEdit} dataEdit={dataEdit ? dataEdit : []} setShowEdit={setShowEdit} />
    </>
  )
}

Template.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Template
