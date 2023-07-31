import React, { useState } from 'react'

// Components import
import CampaignsTable from 'src/views/table/CampaignsTable'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'

function User_group() {
  // ** State
  const [alignment, setAlignment] = useState('Active Campaign')

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        User & Group
      </Typography>
      <hr />
      <Button variant='contained' sx={{ my: 4 }} startIcon={<AddCircleIcon fontSize='large' />}>
        New Group
      </Button>
      <Card sx={{ my: 4, p: 6 }}>
        <CampaignsTable />
      </Card>
    </>
  )
}

export default User_group
