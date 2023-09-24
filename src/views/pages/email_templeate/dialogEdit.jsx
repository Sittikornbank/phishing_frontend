//* eslint-disable react-hooks/rules-of-hooks */
// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Tooltip } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components Import
import { EditorState, convertToRaw } from 'draft-js'

import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import DialogImportEmail from './DialogImportEmail'

// import { EditorState } from 'draft-js'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

import { useForm, Controller } from 'react-hook-form'
import FileUploaderEmailTemplate from './FileUpload'
import { useCreateEmailTemplateMutation } from 'src/store/api'
import { useAuth } from 'src/hooks/useAuth'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

const DialogAdd = props => {
  // ** States
  const { show, setShow, data } = props
  const [open, setOpen] = useState(false)
  const [dataCurrent, setDatacurrent] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [createEmailTemplate] = useCreateEmailTemplateMutation()
  const auth = useAuth()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm()
  if (!show) {
    return null
  }

  const SubmitEmailTemplate = async data => {
    const contentState = editorState.getCurrentContent()
    data.html = contentState.getPlainText()
    data.image_email = dataCurrent
    console.log(data)
    reset()
    const data_cb = await createEmailTemplate(data)
    console.log(data_cb)
    auth.addMessage('Create Successful', 'success')
    setShow(() => false)
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <form onSubmit={handleSubmit(SubmitEmailTemplate)}>
          <DialogContent
            sx={{
              position: 'relative',
              pb: theme => `${theme.spacing(8)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <IconButton
              size='small'
              onClick={() => setShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='mdi:close' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                New Email Template
              </Typography>
            </Box>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <Typography>Name:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Template Name is required' }}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        placeholder='Template Name'
                        {...field}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button variant='contained' sx={{ mr: 1 }} onClick={() => setOpen(true)}>
                    import Email
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>
                    <Box display='flex'>
                      <Box>Envelope Sender:</Box>
                      <Tooltip
                        title='This sender is shown to the user by most email clients. Defaults to the SMTP From as defined in the Sending Profile.'
                        placement='right-end'
                        arrow
                      >
                        <Box>
                          <Icon icon='ph:question-fill' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='envelope_sender'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Envelope Sender is required' }}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        placeholder='First Last <test@example.com>'
                        type='text'
                        {...field}
                        error={!!errors.envelope_sender}
                        helperText={errors.envelope_sender ? errors.envelope_sender.message : ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Subject:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='subject'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Subject is required' }}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        placeholder='Envelope Sender'
                        {...field}
                        error={!!errors.subject}
                        helperText={errors.subject ? errors.subject.message : ''}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='editorContent'
                    control={control}
                    defaultValue={convertToRaw(editorState.getCurrentContent())}
                    render={({ field }) => (
                      <EditorWrapper>
                        <ReactDraftWysiwyg editorState={editorState} onEditorStateChange={setEditorState} />
                      </EditorWrapper>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography>Attachments :</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='attachments[0]'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Attachments is required' }}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        placeholder='Attachments'
                        {...field}
                        error={!!errors['attachments[0]']}
                        helperText={errors['attachments[0]'] ? errors['attachments[0]'].message : ''}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FileUploaderEmailTemplate setData={setDatacurrent} data={dataCurrent} />
                </Grid>
              </Grid>
            </CardContent>
          </DialogContent>
          <DialogActions
            sx={{
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant='contained' type='submit' sx={{ mr: 1 }}>
              Save Profile
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DialogImportEmail show={open} setShow={setOpen} />
    </Card>
  )
}

export default DialogAdd
