// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import {
  Checkbox,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useCreateTemplateMutation, useGetEmailTemplatesQuery, useGetLandingPageQuery } from 'src/store/api'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

export default function DialogCreate({ show, setShow, refetch }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm()
  const auth = useAuth()

  const [EmailTemplate, setEmailTemplate] = useState([])
  const [SiteTemplate, setSiteTemplate] = useState([])

  const emailTemplates = useGetEmailTemplatesQuery()
  const siteTemplates = useGetLandingPageQuery()
  const [createTemplate] = useCreateTemplateMutation()

  useEffect(() => {
    if (!emailTemplates.isLoading) {
      setEmailTemplate(() => emailTemplates.data?.email_templates)
    }

    if (!siteTemplates.isLoading) {
      setSiteTemplate(() => siteTemplates.data?.site_templates)
    }
  }, [emailTemplates, siteTemplates])

  async function SubmitTemplate(data) {
    data.visible = 'all'
    const data_cb = await createTemplate(data)
    if (data_cb.error) {
      auth.addMessage('Create Failed', 'error')
    } else {
      auth.addMessage('Create Successful', 'success')
      setShow(false)
      reset()
      refetch()
    }
  }

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='md'
      scroll='body'
      onClose={() => setShow(false)}
      TransitionComponent={Transition}
      onBackdropClick={() => setShow(false)}
    >
      <DialogTitle textAlign={'center'} fontSize={'30px'}>
        <Typography variant='h5'>Create Sending Profile</Typography>
        <IconButton
          size='small'
          onClick={() => setShow(false)}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <Box component={'form'} onSubmit={handleSubmit(SubmitTemplate)}>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(2)} !important`,
            px: theme => [`${theme.spacing(2)} !important`, `${theme.spacing(8)} !important`],
            pt: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(6.5)} !important`]
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Typography>Name: </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    placeholder='Name'
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Description: </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='description'
                control={control}
                defaultValue=''
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    placeholder='Description'
                    {...field}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Email Template: </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id='mail_template-label'>Email Template</InputLabel>
                <Controller
                  name='mail_template' // The name should match your form data structure
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Mail Template is required' }}
                  render={({ field }) => (
                    <Select
                      labelId='mail_template-label'
                      id='mail_template-select'
                      label='Email Template'
                      name='mail_template'
                      {...field}
                      error={!!errors.mail_template}
                      helperText={errors.mail_template ? errors.mail_template.message : ''}
                    >
                      <MenuItem value=''>
                        <em>Select Mail Template</em>
                      </MenuItem>
                      {!emailTemplates.isLoading && EmailTemplate.length > 0
                        ? EmailTemplate.map(data => {
                            return (
                              <MenuItem key={data.id} value={data.id}>
                                {data.name}
                              </MenuItem>
                            )
                          })
                        : null}
                    </Select>
                  )}
                />
                {errors.role && <FormHelperText error>{errors.mail_template.message}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Site Template: </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id='site_template-label'>Email Template</InputLabel>
                <Controller
                  name='site_template' // The name should match your form data structure
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Mail Template is required' }}
                  render={({ field }) => (
                    <Select
                      labelId='site_template-label'
                      id='site_template-select'
                      label='Site Template'
                      name='site_template'
                      {...field}
                      error={!!errors.site_template}
                      helperText={errors.site_template ? errors.site_template.message : ''}
                    >
                      <MenuItem value=''>
                        <em>Select Mail Template</em>
                      </MenuItem>
                      {!siteTemplates.isLoading && SiteTemplate.length > 0
                        ? SiteTemplate.map(data => {
                            return (
                              <MenuItem key={data.id} value={data.id}>
                                {data.name}
                              </MenuItem>
                            )
                          })
                        : null}
                    </Select>
                  )}
                />
                {errors.role && <FormHelperText error>{errors.mail_template.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            px: theme => [`${theme.spacing(1)} !important`, `${theme.spacing(12)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          <Button type='button' variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button type='submit' variant='contained' sx={{ mr: 1 }}>
            Save Profile
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
