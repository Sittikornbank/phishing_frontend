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
import { Checkbox, FormControlLabel, Typography } from '@mui/material'

const initialData = {
  state: '',
  number: '',
  address: '',
  zipCode: '',
  lastName: 'Doe',
  currency: 'usd',
  firstName: 'John',
  language: 'arabic',
  timezone: 'gmt-12',
  country: 'australia',
  email: 'john.doe@example.com',
  organization: 'ThemeSelection'
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

const TabReporting = () => {
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
              <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs={12} sm={12}>
                  <Typography>Monitor an IMAP account for emails reported by users.</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControlLabel
                    label='Enable Email Account Monitoring'
                    control={<Checkbox onChange={e => handleFormChange('campaign', e.target.value)} name='campaign' />}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>IMAP Host:</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label='Host'
                    placeholder='imap.example.com'
                    value={formData.host}
                    onChange={e => handleFormChange('host', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>IMAP Port:</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label='Port'
                    placeholder='993'
                    value={formData.port}
                    onChange={e => handleFormChange('port', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>IMAP Username:</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label='Username'
                    placeholder='username'
                    value={formData.username}
                    onChange={e => handleFormChange('Username', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography>IMAP Password:</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    type='password'
                    label='Password'
                    placeholder='password'
                    value={formData.password}
                    onChange={e => handleFormChange('password', e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={2} justifySelf={'start'}>
                  <Typography>Use TLS:</Typography>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <FormControlLabel
                    control={<Checkbox onChange={e => handleFormChange('TLS', e.target.value)} name='TLS' />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' sx={{ mr: 4 }}>
                    <Icon icon='material-symbols:save' />
                    Save
                  </Button>
                  <Button variant='contained' sx={{ mr: 4 }}>
                    <Icon icon='uil:setting' />
                    Test Setting
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabReporting
