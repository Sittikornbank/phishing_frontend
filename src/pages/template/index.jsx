import React, { useState } from 'react'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import { useGetTemplateQuery } from 'src/store/api'
import CardTemplate from 'src/views/template/CardTemplate'
import DialogShowUI from 'src/views/pages/email_templeate/dialogShowUI'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import DialogCreate from 'src/views/pages/template/DialogCreate'
import { useAuth } from 'src/hooks/useAuth'

function Template() {
  const template = useGetTemplateQuery()
  let templateData = !template.isLoading ? template.data?.templates : []
  const [showEdit, setShowEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState({})

  const [showCreate, setShowCreate] = useState(false)

  const handleSetShow = () => setShowCreate(() => true)
  const auth = useAuth()

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Template
      </Typography>
      <hr />
      {auth.user.role === 'superadmin' && (
        <Button
          variant='contained'
          sx={{ my: 4 }}
          onClick={() => handleSetShow()}
          startIcon={<AddCircleIcon fontSize='large' />}
        >
          New Template
        </Button>
      )}
      <Grid container sx={{ my: [0, 4, 1.625] }} spacing={5}>
        {templateData?.map(data => {
          return <CardTemplate key={data.id} data={data} setData={setDataEdit} setShow={setShowEdit} />
        })}
      </Grid>
      <DialogShowUI show={showEdit} dataEdit={dataEdit ? dataEdit : []} setShowEdit={setShowEdit} />
      <DialogCreate show={showCreate} setShow={setShowCreate} refetch={() => template.refetch()} />
    </>
  )
}

Template.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Template
