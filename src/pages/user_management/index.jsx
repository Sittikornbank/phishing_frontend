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

import DialogAdd from 'src/views/pages/user-management/dialogAdd'

const UserManagement = () => {
  const [open_Dialog, setOpenDialog] = useState(false)

  const openDialog = () => {
    if (!open_Dialog) {
      setOpenDialog(true)
    } else {
      setOpenDialog(false)
    }
  }

  return (
    <>
      <PageHeader title={<Typography variant='h3'>User Management</Typography>} />
      <Button variant='contained' sx={{ my: 4 }} startIcon={<AddCircleIcon fontSize='large' />} onClick={openDialog}>
        New Users
      </Button>
      <Card sx={{ my: 4, p: 4 }}>
        <DataGridUserMangement />
      </Card>
      <DialogAdd show={open_Dialog} setShow={setOpenDialog} />
    </>
  )
}

export default UserManagement
