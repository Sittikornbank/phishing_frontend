// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Select from '@mui/material/Select'

import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { FormHelperText } from '@mui/material'
import { useUpdateUserMutation } from 'src/store/api'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect } from 'react'

const DialogEdit = props => {
  // ** States
  const { show, setShow, data } = props

  const [updateUser] = useUpdateUserMutation()
  const auth = useAuth()

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue
  } = useForm()

  useEffect(() => {
    setValue('id', data.id)
    setValue('username', data.username)
    setValue('email', data.email)
    setValue('firstname', data.firstname)
    setValue('lastname', data.lastname)
    setValue('phonenumber', data.phonenumber)
    setValue('organization', data.organization)
    setValue('role', data.role)
    setValue('lastname', data.lastname)
  }, [setValue, data])

  const SubmitUpdateUser = async data => {
    const data_cb = await updateUser(data.id, data)
    console.log(data_cb)

    if (!data_cb?.error) {
      auth.addMessage('Update User Success', 'success')
    } else {
      auth.addMessage(data_cb?.error.data.detail, 'error')
    }
  }

  return (
    <Card>
      <Dialog fullWidth open={show} maxWidth='md' scroll='body'>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(2)} !important`,
            px: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(4)} !important`],
            pt: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(8.5)} !important`]
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
              Craete New User
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(SubmitUpdateUser)}>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='username'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField autoFocus fullWidth type='text' {...field} label='Username' />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField autoFocus fullWidth type='text' {...field} label='Email' />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField {...field} type='password' label='Password' fullWidth />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='firstname'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField autoFocus fullWidth type='text' {...field} label='Firstname' />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='lastname'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField autoFocus fullWidth type='text' {...field} label='Lastname' />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='phonenumber'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField autoFocus fullWidth type='text' {...field} label='Phone No.' />}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='organization'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField autoFocus fullWidth type='text' {...field} label='Organization' />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                    <Controller
                      name='role' // The name should match your form data structure
                      control={control}
                      defaultValue=''
                      rules={{ required: 'Role is required' }}
                      render={({ field }) => (
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Role'
                          name='role'
                          {...field}
                          error={!!errors.username}
                          helperText={errors.role ? errors.role.message : ''}
                        >
                          <MenuItem value=''>
                            <em>Select Role</em>
                          </MenuItem>
                          <MenuItem value={'superadmin'}>Superadmin</MenuItem>
                          <MenuItem value={'admin'}>Admin</MenuItem>
                          <MenuItem value={'auditor'}>Auditor</MenuItem>
                          <MenuItem value={'paid'}>Paid</MenuItem>
                          <MenuItem value={'guest'}>Guest</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
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
                Update Profile
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogEdit
