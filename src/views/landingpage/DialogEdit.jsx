import { useEffect, useState } from 'react'

// ** MUI Import
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Third Party Imports
import { ContentState, EditorState } from 'draft-js'
import { useUpdateLandingPageMutation } from 'src/store/api'
import { useAuth } from 'src/hooks/useAuth'

function DialogEdit({ handleClose, open, data, refrechedData }) {
  const [updateSiteTemplate] = useUpdateLandingPageMutation()
  const [dataCurrent, setDatacurrent] = useState(() => data)
  const [editorState, setEditorState] = useState()
  const auth = useAuth()
  useEffect(() => {
    setDatacurrent(() => data)
    setEditorState(() => {
      const contentState = ContentState.createFromText(data?.html ? data.html : '')

      return EditorState.createWithContent(contentState)
    })
  }, [data])

  const updateData = event => {
    const target = event.currentTarget
    setDatacurrent({
      ...dataCurrent,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value
    })
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
    const data = dataCurrent

    const data_cb = await updateSiteTemplate({
      id: data.id,
      name: data.name,
      html: data.html,
      redirect_url: data.redirect_url,
      capture_credentials: data.capture_credentials,
      capture_passwords: data.capture_passwords
    })

    if (data_cb?.data) {
      auth.addMessage('Update Successful', 'success')
      handleClose()
      refrechedData()
    } else {
      auth.addMessage(data_cb?.error.data.detail, 'error')
    }
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth={'lg'}
    >
      <DialogTitle id='alert-dialog-title'>Edit: {data?.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} alignItems={'center'} sx={{ mb: 4, mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              fullWidth
              type='text'
              name='name'
              label='Name'
              value={dataCurrent?.name}
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
              checked={dataCurrent?.capture_credentials}
              onChange={updateData}
              control={<Checkbox name='capture_credentials' />}
            />
            <FormControlLabel
              label='Capture Password'
              checked={dataCurrent?.capture_passwords}
              onChange={updateData}
              control={<Checkbox name='capture_passwords' />}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant='contained' onClick={handleClose} sx={{ mr: 4 }}>
              Close
            </Button>
            <Button
              variant='contained'
              sx={{ mr: 4 }}
              onClick={() => SubmitData()}
              startIcon={<Icon icon='material-symbols:save' />}
            >
              Create Group
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  )
}

export default DialogEdit
