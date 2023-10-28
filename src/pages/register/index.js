// ** React Imports
import { use, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import Image from 'next/image'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import DangerousIcon from '@mui/icons-material/Dangerous'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Alert, FormHelperText, Grid } from '@mui/material'
import { useRegisterQuery } from 'src/store/api'
import axios from 'axios'

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '46rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem'
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  bottom: 0,
  left: '1.875rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 700
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { mt: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const url = `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_USERAUTH_PORT}/register`

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '60rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '60rem'
  }
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [matchPassword, setMatchPassword] = useState(false)
  const [msgRegister, setRegister] = useState('')

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings
  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  async function SubmitData(e) {
    e.preventDefault()
    const dataForm = new FormData(e.target)
    const data = Object.fromEntries(dataForm.entries())

    // * Check Password
    if (data.password != data.confirm_password) setMatchPassword(true)
    else setMatchPassword(false)

    axios
      .post(url, data)
      .then(function (response) {
        console.log(response)
        setRegister(response.response.data.detail)
      })
      .catch(function (error) {
        console.log(error)
        setRegister(error.response?.data.detail)
      })
  }

  return (
    <>
      <Box className='content-right'>
        {!hidden ? (
          <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <LoginIllustration
              sx={{
                width: '30%',
                margin: 'auto',
                display: 'block',
                animation: 'beat .7s infinite alternate',
                '@keyframes beat': { to: { transform: 'scale(1.4)' } }
              }}
              alt='login-illustration'
              src={`/images/pages/Logo.png`}
            />
          </Box>
        ) : null}
        <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
          <Box
            sx={{
              p: 12,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'background.paper'
            }}
          >
            <BoxWrapper>
              <Box
                sx={{
                  top: 30,
                  left: 40,
                  display: 'flex',
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image src={`/images/pages/Logo.png`} alt='Logo' width={50} height={50} />
                <Typography
                  variant='h6'
                  sx={{
                    ml: 3,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '1.5rem !important'
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <Box sx={{ mb: 6 }}>
                <TypographyStyled variant='h5' textAlign={'center'}>
                  Register
                </TypographyStyled>
              </Box>
              <form autoComplete='off' onSubmit={e => SubmitData(e)}>
                <Grid container spacing={4} justifyContent={'space-between'} sx={{ mb: 6 }}>
                  <Grid item xs={12}>
                    <TextField autoFocus fullWidth required label='Username' name='username' />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                      <OutlinedInput
                        label='Password'
                        id='auth-login-v2-password'
                        name='password'
                        error={matchPassword}
                        type={showPassword ? 'text' : 'password'}
                        required
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='auth-login-v2-password'>Confirm Password</InputLabel>
                      <OutlinedInput
                        label='Confirm Password'
                        id='auth-login-v2-password'
                        error={matchPassword}
                        type={showPassword ? 'text' : 'password'}
                        name='confirm_password'
                        required
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {matchPassword && (
                        <FormHelperText sx={{ color: 'error.main', display: 'flex', gap: 2 }}>
                          <DangerousIcon fontSize='small' /> <span>Password not match</span>
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField autoFocus fullWidth required label='E-Mail' name='email' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField autoFocus fullWidth required label='Firstname' name='firstname' />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField autoFocus fullWidth required label='Lastname' name='lastname' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField autoFocus fullWidth required label='Telephone' name='phonenumber' />
                  </Grid>
                  <Grid item xs={12}>
                    {msgRegister && (
                      <FormHelperText sx={{ color: 'error.main', display: 'flex', gap: 2 }}>
                        <DangerousIcon fontSize='small' /> <span>{msgRegister}</span>
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 6 }}>
                  Sign up
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant='body2' sx={{ mr: 2 }}>
                    Already have an account?
                  </Typography>
                  <Typography variant='body2'>
                    <LinkStyled href='/login'>Sign in instead</LinkStyled>
                  </Typography>
                </Box>
              </form>
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Box>
    </>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
