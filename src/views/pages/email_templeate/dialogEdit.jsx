//* eslint-disable react-hooks/rules-of-hooks */
// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

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

import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import DialogImportEmail from './DialogImportEmail'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Third Party Imports
import { ContentState, EditorState, convertToRaw } from 'draft-js'

import { useForm, Controller } from 'react-hook-form'
import FileUploaderEmailTemplate from './FileUpload'
import { useUpdateEmailTemplateMutation } from 'src/store/api'
import { useAuth } from 'src/hooks/useAuth'
import { set } from 'nprogress'

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

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const DialogEdit = ({ show, handleClose, data, refrechedData }) => {
  // ** States
  console.log(show)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm()

  useEffect(() => {
    console.log(data)
    if (!data) return
    setValue('id', data?.id)
    setValue('name', data?.name)
    setValue('envelope_sender', data?.envelope_sender)
    setValue('subject', data?.subject)
    setValue('attachments[0]', data?.attachments ? data.attachments[0] : '')
    setValue('image_email', data?.image_email)

    setEditorState(() => {
      const contentState = ContentState.createFromText(data?.html ? data.html : '')

      return EditorState.createWithContent(contentState)
    })
    setDatacurrent(data?.image_email)
  }, [data, setValue])

  const [open, setOpen] = useState(false)
  const [dataCurrent, setDatacurrent] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [updateEmailTemplate] = useUpdateEmailTemplateMutation()
  const auth = useAuth()

  const SubmitEmailTemplate = async data_form => {
    if (data.name === data_form.name) delete data_form.name
    if (data.envelope_sender === data_form.envelope_sender) delete data_form.envelope_sender
    if (data.subject === data_form.subject) delete data_form.subject
    if (data.attachments[0] === data_form.attachments[0]) delete data_form.attachments[0]
    if (data.image_email === data_form.image_email) {
      delete data_form.image_email
    } else {
      data_form.image_email = dataCurrent
    }
    delete data_form.editorContent
    delete data_form.attachments
    const contentState = editorState.getCurrentContent()
    data_form.html = contentState.getPlainText()
    const data_cb = await updateEmailTemplate(data_form)
    console.log(data_cb)
    if (data_cb?.data) {
      auth.addMessage('Create Successful', 'success')
      handleClose()
      refrechedData()
      reset()
    } else {
      auth.addMessage(data_cb?.error.data.detail, 'error')
    }
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
                        <ReactDraftWysiwyg
                          editorState={editorState}
                          onEditorStateChange={setEditorState}
                          editorStyle={{ height: '200px' }}
                        />
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

export default DialogEdit
