import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Box, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'

import { useEffect, useState } from 'react'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Third Party Imports
import { ContentState, EditorState } from 'draft-js'
import { useCreateLandingPageMutation } from 'src/store/api'
import FileUploaderLandingPage from './FileUpload'
import { useAuth } from 'src/hooks/useAuth'

const defaultData = {
  name: '',
  html: '',
  capture_credentials: false,
  capture_passwords: false,
  image_site: ''
}

export default function DialogAdd({ handleClose, open, refrech }) {
  const [dataCurrent, setDatacurrent] = useState(defaultData)
  const auth = useAuth()

  const [editorState, setEditorState] = useState(() => {
    const contentState = ContentState.createFromText(defaultData.html)

    return EditorState.createWithContent(contentState)
  })

  const [CreateLandingPage] = useCreateLandingPageMutation()

  const updateData = event => {
    const target = event.currentTarget
    if (target.type === 'file') {
      setDatacurrent({ ...dataCurrent })
    } else {
      setDatacurrent({
        ...dataCurrent,
        [target.name]: target.type === 'checkbox' ? target.checked : target.value
      })
    }
  }

  const updateEditor = data => {
    const contentState = editorState.getCurrentContent()
    const text = contentState.getPlainText()
    setDatacurrent({
      ...dataCurrent,
      html: text
    })
    setEditorState(data)
  }

  const SubmitData = async () => {
    const cb = await CreateLandingPage(dataCurrent)
    if (!cb?.error) {
      auth.addMessage('Create Landing Page Success', 'success')
      refrech()
      handleClose()
    } else {
      auth.addMessage(cb?.error.data.detail, 'error')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth={'lg'}
    >
      <DialogTitle id='alert-dialog-title'>Create new Landingpage</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} alignItems={'center'} sx={{ mb: 4, mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              fullWidth
              type='text'
              name='name'
              label='Name'
              value={dataCurrent.name}
              onChange={updateData}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ mr: 4 }} startIcon={<Icon icon='material-symbols:web' />}>
              Import site
            </Button>
          </Grid>

          <Grid item xs={12}>
            <ReactDraftWysiwyg
              editorState={editorState}
              onEditorStateChange={data => updateEditor(data)}
              editorStyle={{ height: '200px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              fullWidth
              type='text'
              name='redirect_url'
              label='Redirect URL'
              value={dataCurrent?.redirect_url}
              onChange={updateData}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              label='Capture Credentials'
              control={
                <Checkbox name='capture_credentials' checked={dataCurrent.capture_credentials} onChange={updateData} />
              }
            />
            <FormControlLabel
              label='Capture Password'
              control={
                <Checkbox name='capture_passwords' checked={dataCurrent.capture_passwords} onChange={updateData} />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FileUploaderLandingPage setData={setDatacurrent} data={dataCurrent} />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant='contained' onClick={handleClose} sx={{ mr: 4 }}>
              Close
            </Button>
            <Button
              variant='contained'
              sx={{ mr: 4 }}
              onClick={SubmitData}
              startIcon={<Icon icon='material-symbols:save' />}
            >
              Create Landing Page
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}
