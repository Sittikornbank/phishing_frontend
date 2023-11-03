// ** React Imports
import { useState, forwardRef, useCallback, useRef, useEffect } from 'react'
import { useForm, Controller, get } from 'react-hook-form'

import { v4 as uuidv4 } from 'uuid'

// ** MUI Imports
import { Box, Grid, Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Table
import TargetGroupTable from 'src/views/table/TargetGroupTable'

import { styled } from '@mui/material/styles'
import { useCreateGroupMutation } from 'src/store/api'
import { useAuth } from 'src/hooks/useAuth'
import { de } from 'date-fns/locale'

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

export default function DialogAdd({ setShow, show, refetch }) {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors }
  } = useForm()

  const [userDataTarget, setUserDataTarget] = useState([])
  const [CreateGroup] = useCreateGroupMutation()
  const auth = useAuth()

  const fileChange = e => {
    console.log(e.target.value)
  }

  useEffect(() => {
    reset()
    setUserDataTarget([])
  }, [show, reset])

  const insertData = () => {
    const fName = getValues('Firstname')
    const lName = getValues('Lastname')
    const email = getValues('email')
    const position = getValues('position')

    // Seta data to table
    setUserDataTarget([...userDataTarget, { _id: uuidv4(), firstname: fName, lastname: lName, email, position }])

    // Clear form
    setValue('Firstname', '')
    setValue('Lastname', '')
    setValue('email', '')
    setValue('position', '')
  }

  const onSubmit = async data => {
    delete data.Firstname
    delete data.Lastname
    delete data.email
    delete data.position

    data.targets = userDataTarget

    const data_cb = await CreateGroup(data)
    console.log(data)
    if (data_cb.error) {
      auth.addMessage('Create Failed', 'error')
    } else {
      auth.addMessage('Create Successful', 'success')
    }
    setShow(() => false)
    reset()
    refetch()
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4} alignItems={'center'} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Typography variant='subtitle1' component='p'>
                  Name:
                </Typography>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: 'Group Name is required' }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      placeholder='Group Name'
                      {...field}
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                    />
                  )}
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
                <Controller
                  name='Firstname'
                  control={control}
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Lastname:
                </Typography>
                <Controller
                  name='Lastname'
                  control={control}
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Email:
                </Typography>
                <Controller name='email' control={control} render={({ field }) => <TextField fullWidth {...field} />} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' component='p'>
                  Position:
                </Typography>
                <Controller
                  name='position'
                  control={control}
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant='contained'
                  sx={{ mr: 4 }}
                  type='button'
                  onClick={insertData}
                  startIcon={<Icon icon='material-symbols:add' />}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TargetGroupTable data={userDataTarget} setUserDataTarget={setUserDataTarget} />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained' onClick={setShow} sx={{ mr: 4 }}>
                  Close
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  sx={{ mr: 4 }}
                  startIcon={<Icon icon='material-symbols:save' />}
                >
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
