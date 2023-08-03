import React, { useState, useCallback } from 'react'

// Components import
import LandingpageTable from 'src/views/table/LandingpageTable'

// MUI Import
import Typography from '@mui/material/Typography'
import { Card, CardHeader, CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Icon from 'src/@core/components/icon'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { EditorState } from 'draft-js'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Icon Imports
import AddCircleIcon from '@mui/icons-material/AddCircle'

const initialUserData = {
  groupName: '',
  Firstname: '',
  Lastname: '',
  email: ''
}

function Campaigns() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modal_style = {
    position: 'absolute',
    overflowY: 'scroll',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 6
  }

  const [value, setValue] = useState(EditorState.createEmpty())
  const [userData, setUserData] = useState(initialUserData)

  const updateUserDataHandler = useCallback(
    type => event => {
      setUserData({ ...userData, [type]: event.target.value })
    },
    [userData]
  )

  const formHandler = useCallback(
    () => event => {
      event.preventDefault()
      console.log(userData)
    },
    [userData]
  )

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Landing Page
      </Typography>
      <hr />
      <Button variant='contained' sx={{ my: 4 }} onClick={handleOpen} startIcon={<AddCircleIcon fontSize='large' />}>
        New Page
      </Button>
      <Card sx={{ my: 4, p: 6 }}>
        <LandingpageTable />
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modal_style}>
          <Typography id='modal-modal-title' variant='h5' component='h2' sx={{ mb: 4 }}>
            New Template
          </Typography>
          <form onSubmit={formHandler()}>
            <Grid container spacing={4} alignItems={'center'} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Page Name:
                </Typography>
                <TextField
                  fullWidth
                  placeholder='Page Name'
                  value={userData.pageName}
                  onChange={updateUserDataHandler('groupName')}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' sx={{ mr: 4 }} startIcon={<Icon icon='material-symbols:web' />}>
                  Import site
                </Button>
              </Grid>

              <Grid item xs={12}>
                <ReactDraftWysiwyg
                  editorState={value}
                  onEditorStateChange={data => setValue(data)}
                  editorStyle={{ height: '200px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel label='Captute Submitted Data' control={<Checkbox name='Captute_Submitted_Data' />} />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained' onClick={handleClose} sx={{ mr: 4 }}>
                  Close
                </Button>
                <Button variant='contained' sx={{ mr: 4 }} startIcon={<Icon icon='material-symbols:save' />}>
                  Create Group
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  )
}

Campaigns.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Campaigns
