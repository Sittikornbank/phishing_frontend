// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const initialData = {
  APIKey: '',
  username: '',
  oldPassword: '',
  NewPassword: '',
  ConfirmNewPassword: ''
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [userInput, setUserInput] = useState('yes')
  const [formData, setFormData] = useState(initialData)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  const onSubmit = () => setOpen(true)

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <form>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={10} sm={10}>
                  <TextField
                    fullWidth
                    label='API Key'
                    placeholder='http://google.com:'
                    value={formData.APIKey}
                    onChange={e => handleFormChange('APIKey', e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Button variant='contained' sx={{ mr: 4 }}>
                    <Icon icon='system-uicons:reset' />
                    Reset
                  </Button>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label='Username'
                    placeholder='Doe'
                    value={formData.username}
                    onChange={e => handleFormChange('username', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    type='password'
                    label='Old Password'
                    value={formData.oldPassword}
                    onChange={e => handleFormChange('oldPassword', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    type='password'
                    label='New Password'
                    value={formData.NewPassword}
                    onChange={e => handleFormChange('NewPassword', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    type='password'
                    label='Confirm New Password'
                    value={formData.ConfirmNewPassword}
                    onChange={e => handleFormChange('ConfirmNewPassword', e.target.value)}
                  />
                </Grid>

                <Grid item xs={10}>
                  <Box display='flex' justifyContent='center'>
                    <Button variant='contained' sx={{ mr: 4 }}>
                      <Icon icon='material-symbols:save' />
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabAccount
