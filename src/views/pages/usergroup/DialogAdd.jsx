// ** React Imports
import { useState, forwardRef, useCallback, useRef } from 'react'

// ** MUI Imports
import { Box, Grid, Card, Switch, Select, Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Table
import TargetGroupTable from 'src/views/table/TargetGroupTable'

import { styled } from '@mui/material/styles'

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const initialUserData = {
  groupName: '',
  Firstname: '',
  Lastname: '',
  email: ''
}

export default function DialogAdd({ setShow, show }) {
  const [userData, setUserData] = useState(initialUserData)
  const [dataTarget, setDataTarget] = useState()
  const formRef = useRef()

  const formHandler = useCallback(
    () => event => {
      event.preventDefault()
      console.log(userData)
    },
    [userData]
  )

  const updateUserDataHandler = useCallback(
    type => event => {
      setUserData({ ...userData, [type]: event.target.value })
    },
    [userData]
  )

  const fileChange = e => {
    console.log(e.target.value)
  }

  const insertData = () => {}

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='md'
      scroll='body'
      onClose={setShow}
      TransitionComponent={Transition}
      onBackdropClick={setShow}
    >
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Box>
          <form ref={formRef} onSubmit={formHandler()}>
            <Grid container spacing={4} alignItems={'center'} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Name:
                </Typography>
                <TextField
                  fullWidth
                  placeholder='Group Name'
                  value={userData.groupName}
                  onChange={updateUserDataHandler('groupName')}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant='contained'
                  sx={{ mr: 4 }}
                  component='label'
                  startIcon={<Icon icon='material-symbols:add' />}
                >
                  Book Import Use
                  <VisuallyHiddenInput
                    type='file'
                    accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                    onChange={fileChange}
                  />
                </Button>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={4} alignItems={'center'}>
              <Grid item xs={6}>
                <Typography variant='subtitle1' component='p'>
                  Firstname:
                </Typography>
                <TextField fullWidth value={userData.Firstname} onChange={updateUserDataHandler('Firstname')} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Lastname:
                </Typography>
                <TextField fullWidth value={userData.Lastname} onChange={updateUserDataHandler('Lastname')} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Email:
                </Typography>
                <TextField fullWidth value={userData.email} onChange={updateUserDataHandler('email')} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Position:
                </Typography>
                <TextField fullWidth value={userData.position} onChange={updateUserDataHandler('position')} />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant='contained'
                  sx={{ mr: 4 }}
                  onClick={insertData}
                  startIcon={<Icon icon='material-symbols:add' />}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TargetGroupTable data={[]} />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained' onClick={setShow} sx={{ mr: 4 }}>
                  Close
                </Button>
                <Button variant='contained' sx={{ mr: 4 }} startIcon={<Icon icon='material-symbols:save' />}>
                  Create Group
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
