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
import { DialogTitle, Tooltip } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useForm, Controller } from 'react-hook-form'
import { useCreateCampaignMutation } from 'src/store/api'
import { useAuth } from 'src/hooks/useAuth'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

export default function DialogCreateCampains({ show, handleClose, Refetch }) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm()
  const auth = useAuth()
  const [CreateCampains] = useCreateCampaignMutation()

  useEffect(() => {
    setValue('send_by_date', null)
  }, [setValue])

  const SubmitEmailTemplate = async data => {
    const data_cb = await CreateCampains(data)
    if (data_cb.error) {
      auth.addMessage('Create Failed', 'error')

      return
    }
    handleClose()
    auth.addMessage('Create Successful', 'success')
    Refetch()
    reset()
  }

  return (
    <Dialog fullWidth open={show} maxWidth='md' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle textAlign={'center'} fontSize={'30px'}>
        <Typography variant='h5'>Create New Campaign</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(SubmitEmailTemplate)}>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(10)} !important`,
            px: theme => [`${theme.spacing(2)} !important`, `${theme.spacing(8)} !important`],
            pt: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(6.5)} !important`]
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Typography>Name:</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{ required: 'Campainsname is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    placeholder='Campainsname'
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Template: </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='templates_id'
                control={control}
                defaultValue=''
                rules={{ required: 'Template is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    placeholder='Templete'
                    type='number'
                    {...field}
                    error={!!errors.templates_id}
                    helperText={errors.templates_id ? errors.templates_id.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Group: </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='group_id'
                control={control}
                defaultValue=''
                rules={{ required: 'Group is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    type='number'
                    placeholder='Group'
                    {...field}
                    error={!!errors.group_id}
                    helperText={errors.group_id ? errors.group_id.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Sending Profile: </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='smtp_id'
                control={control}
                defaultValue=''
                rules={{ required: 'Sending Profile is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    placeholder='Sending Profile'
                    type='number'
                    {...field}
                    error={!!errors.smtp_id}
                    helperText={errors.smtp_id ? errors.smtp_id.message : ''}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' type='submit' sx={{ mr: 1 }}>
            Create Campaign
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
