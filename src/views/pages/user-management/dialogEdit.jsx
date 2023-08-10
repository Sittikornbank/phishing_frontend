// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { visuallyHidden } from '@mui/utils'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import Paper from '@mui/material/Paper'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material'

const initialData = {
  user_name: '',
  password: '',
  confirm_password: '',
  set_new_password: true,
  account_locked: false,
  role: ''
}

const DialogEdit = props => {
  // ** States
  const { show, setShow, data } = props

  if (!show) {
    return null
  }

  const SubmitUpdateUser = e => {
    e.preventDefault()
    const data = new FormData(e.target)
    const a = Object.fromEntries(data.entries())
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
              New Sending Profile
            </Typography>
          </Box>
          <form onSubmit={SubmitUpdateUser}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <Typography>Username:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField fullWidth name='username' placeholder='username' value={data.username} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Password:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField fullWidth type='password' name='password' placeholder='password' />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Confirm Password:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField fullWidth type='password' name='confirm_password' placeholder='Confirm Password' />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    control={<Checkbox name='set_new_password' />}
                    label='Require the user to set a new password'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    control={<Checkbox checked={!data.is_active} name='account_locked' />}
                    label='Account Locked'
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={data.role}
                      label='Role'
                      name='role'
                    >
                      <MenuItem value={'superadmin'}>Superadmin</MenuItem>
                      <MenuItem value={'admin'}>admin</MenuItem>
                      <MenuItem value={'auditor'}>Auditor</MenuItem>
                      <MenuItem value={'paid'}>Paid</MenuItem>
                      <MenuItem value={'guest'}>Guest</MenuItem>
                    </Select>
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

export default DialogEdit
