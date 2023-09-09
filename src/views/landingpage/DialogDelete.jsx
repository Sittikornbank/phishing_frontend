// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

function DialogDelete({ handleClose, open, data, DeleteData }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Do You Want to Delete {data?.name}</DialogTitle>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={() => DeleteData(data.id)} color='success'>
          Yes
        </Button>
        <Button onClick={handleClose} color='error'>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDelete
