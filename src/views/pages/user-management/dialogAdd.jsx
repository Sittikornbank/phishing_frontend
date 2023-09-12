// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
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
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'

import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Checkbox, FormHelperText } from '@mui/material'
import { useCreateUserMutation } from 'src/store/api'

const DialogAdd = props => {
  // ** States
  const { show, setShow } = props
  const [CreateUser] = useCreateUserMutation()

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
    setError
  } = useForm()

  const SubmitUpdateUser = async data => {
    console.log(data)
  }

  return (
    <Card>
      <Dialog fullWidth open={show} maxWidth='md' scroll='body'>
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
              Craete New User
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(SubmitUpdateUser)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <Typography>Username:</Typography>
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
                        {...field}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                        label='Username'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Password:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    rules={{
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      },
                      validate: value => value === getValues('confirmPassword') || ''
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='password'
                        label='Password'
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Confirm Password:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='confirmPassword'
                    control={control}
                    defaultValue=''
                    rules={{
                      required: 'Confirm Password is required',
                      validate: value => value === getValues('password') || 'Passwords do not match'
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='password'
                        label='Confirm Password'
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    label='Require the user to set a new password'
                    control={
                      <Controller
                        name='set_new_password' // The name should match your form data structure
                        control={control}
                        defaultValue={false} // Set the default value for the checkbox
                        render={({ field }) => <Checkbox {...field} />}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    label='Account Locked'
                    control={
                      <Controller
                        name='account_locked' // The name should match your form data structure
                        control={control}
                        defaultValue={false} // Set the default value for the checkbox
                        render={({ field }) => <Checkbox {...field} />}
                      />
                    }
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
                Save Profile
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogAdd
