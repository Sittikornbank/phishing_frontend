import React, { useState } from 'react'

// Components import
import LandingpageTable from 'src/views/table/LandingpageTable'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'

function Campaigns() {
  // ** State
  const [alignment, setAlignment] = useState('Active Campaign')

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Landing Page
      </Typography>
      <hr />
      <Button variant='contained' sx={{ my: 4 }} startIcon={<AddCircleIcon fontSize='large' />}>
        New Page
      </Button>
      <Card sx={{ my: 4, p: 6 }}>
        <LandingpageTable />
      </Card>
    </>
  )
}

Campaigns.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Campaigns
