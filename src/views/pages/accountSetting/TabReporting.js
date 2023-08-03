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
import { Checkbox, FormControlLabel, Tooltip, Typography } from '@mui/material'

const initialData = {
  campaign: '',
  host: '',
  port: '',
  username: '',
  password: '',
  TLS: '',
  folder: '',
  polling: '',
  domain: '',
  certificate: '',
  campaigns: ''
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
  const [openAdvance, setOpenAdvance] = useState(false)

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

  const handleOpenAdvance = () => {
    console.log('openAdvance', openAdvance)
    if (openAdvance) {
      setOpenAdvance(false)
    } else {
      setOpenAdvance(true)
    }
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
                    control={
                      <Checkbox
                        checked={formData.campaign}
                        onChange={e => handleFormChange('campaign', e.target.checked)}
                        name='campaign'
                      />
                    }
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
                    onChange={e => handleFormChange('username', e.target.value)}
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
                <Grid item xs={12} sm={2} justifySelf={'start'}>
                  <Typography>Use TLS:</Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.TLS}
                        onChange={e => handleFormChange('TLS', e.target.checked)}
                        name='TLS'
                      />
                    }
                  />
                </Grid>
                {openAdvance && (
                  <>
                    <Grid item xs={12} sm={2}>
                      <Typography>Folder:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <TextField
                        fullWidth
                        label='Folder'
                        placeholder='Leave blank for default of INBOX.'
                        value={formData.folder}
                        onChange={e => handleFormChange('folder', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Tooltip title='How often to check for new emails. 30 seconds minimum.' placement='top-end' arrow>
                        <Typography>Polling frequency:</Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <TextField
                        fullWidth
                        type='number'
                        label='Polling frequency'
                        placeholder='Leave blank for default of every 60 seconds.'
                        value={formData.polling}
                        onChange={e => handleFormChange('polling', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Tooltip title='Only check emails reported from the supplied domain.' placement='top-end' arrow>
                        <Typography>Restrict to domain:</Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <TextField
                        fullWidth
                        label='Restrict to domain'
                        placeholder='e.g. widgets.com. Leave blank for all domains. '
                        value={formData.domain}
                        onChange={e => handleFormChange('domain', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Tooltip
                        title='Ignore common certificate errors such as self-signed certs (exposes you to MiTM attacks - use carefully!)'
                        placement='top-end'
                        arrow
                      >
                        <Typography>Ignore Certificate Errors:</Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.certificate}
                            onChange={e => handleFormChange('certificate', e.target.checked)}
                            name='certificate'
                          />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Tooltip title={`Delete campaign emails after the've been reported.`} placement='top-end' arrow>
                        <Typography>Delete campaigns emails:</Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.campaigns}
                            onChange={e => handleFormChange('campaigns', e.target.checked)}
                            name='campaigns'
                          />
                        }
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12} sm={12}>
                  <Box textAlign='right'>
                    <Typography color='primary' sx={{ cursor: 'pointer' }} onClick={() => handleOpenAdvance()}>
                      Advanced Settings
                    </Typography>
                  </Box>
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
