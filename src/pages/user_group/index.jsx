import React, { useState, useCallback } from 'react'

// Components import
import GroupTable from 'src/views/table/GroupTable'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useGetGroupQuery } from 'src/store/api'
import TargetGroupTable from 'src/views/table/TargetGroupTable'
import DialogAdd from 'src/views/pages/usergroup/DialogAdd'

const initialUserData = {
  groupName: '',
  Firstname: '',
  Lastname: '',
  email: ''
}

function User_group() {
  const Group = useGetGroupQuery()
  let groupsData = !Group.isLoading ? Group.data?.groups : []

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [userData, setUserData] = useState(initialUserData)

  const updateUserDataHandler = useCallback(
    type => event => {
      setUserData({ ...userData, [type]: event.target.value })
    },
    [userData]
  )

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        User & Group
      </Typography>
      <hr />
      <Button variant='contained' onClick={handleOpen} sx={{ my: 4 }} startIcon={<AddCircleIcon fontSize='large' />}>
        New Group
      </Button>
      <Card sx={{ my: 4, p: 6 }}>
        <GroupTable data={groupsData} />
      </Card>

      <DialogAdd setShow={handleClose} show={open} />
    </>
  )
}

export default User_group
