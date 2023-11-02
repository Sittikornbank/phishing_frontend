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
import { Checkbox, DialogTitle, FormControlLabel, Tooltip } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useCreateSmtpDataMutation } from 'src/store/api'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

export default function DialogAdd({ show, setShow, refetch }) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm()
  const auth = useAuth()
  const [CreateSMTP] = useCreateSmtpDataMutation()

  async function SubmitSendingProfile(data) {
    const data_cb = await CreateSMTP(data)
    console.log(data)
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
      <Box component={'form'} onSubmit={handleSubmit(SubmitSendingProfile)}>
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
              <Typography>UserID: </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='user_id'
                control={control}
                defaultValue=''
                rules={{ required: 'Campainsname is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    type='number'
                    placeholder='User ID'
                    {...field}
                    error={!!errors.user_id}
                    helperText={errors.user_id ? errors.user_id.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography>Name:</Typography>
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
              <Typography>From Address : </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='from_address'
                control={control}
                defaultValue=''
                rules={{ required: 'From Address is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    type='text'
                    placeholder='From Address'
                    {...field}
                    error={!!errors.from_address}
                    helperText={errors.from_address ? errors.from_address.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Host : </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='host'
                control={control}
                defaultValue=''
                rules={{ required: 'Host is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    type='text'
                    placeholder='Host'
                    {...field}
                    error={!!errors.host}
                    helperText={errors.host ? errors.host.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Username :</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='username'
                control={control}
                defaultValue=''
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    type='text'
                    placeholder='Username'
                    {...field}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography>Password :</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='password'
                control={control}
                defaultValue=''
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <TextField
                    autoFocus
                    fullWidth
                    type='password'
                    placeholder='Password'
                    {...field}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='ignore_cert_errors'
                control={control}
                defaultValue=''
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <FormControlLabel
                    label='Igore Cerificate Errors'
                    checked={field.value}
                    onChange={field.onChange}
                    control={<Checkbox name='capture_passwords' />}
                  />
                )}
              />
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
