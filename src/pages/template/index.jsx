import React, { useState } from 'react'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import { useGetLandingPageQuery } from 'src/store/api'
import CardTemplate from 'src/views/template/CardTemplate'

function Template() {
  const template = useGetLandingPageQuery()
  let templateData = !template.isLoading ? template.data?.site_templates : []
  console.log(template);

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Template
      </Typography>
      <hr />
      <Grid container sx={{ my: [0, 4, 1.625] }} spacing={5}>
        {templateData.map((data) => {
          return (<CardTemplate key={data.id} data={data}  />)
        })}
      </Grid>
    </>
  )
}

export default Template
