import { useState } from 'react'

// MUI import
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DataGridUserMangement from 'src/views/pages/user-management/DataGridUserMangement'
import { Card } from '@mui/material'

const UserManagement = () => {
  return (
    <>
      <PageHeader title={<Typography variant='h3'>User Management</Typography>} />

      <Button variant='contained' sx={{ my: 4 }} startIcon={<AddCircleIcon fontSize='large' />}>
        New Users
      </Button>
      <Card sx={{ my: 4, p: 4 }}>
        <DataGridUserMangement />
      </Card>
    </>
  )
}

export default UserManagement
