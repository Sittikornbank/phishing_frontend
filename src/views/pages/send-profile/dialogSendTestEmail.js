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
  name: '',
  interface_type: 'SMTP',
  smtp: '',
  host: '',
  username: '',
  password: '',
  certificate: ''
}

const DialogSendTestEmail = props => {
  // ** States
  const { show, setShow } = props
  const [formData, setFormData] = useState(initialData)
  const [headers, setHeaders] = useState([])
  const [header, setHeader] = useState('')
  const [value, setValue] = useState('')
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderBy, setOrderBy] = useState('header')
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const clickDelete = e => {
    setHeaders(current => [
      ...headers.filter(function (v) {
        return v !== e
      })
    ])
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - headers.length) : 0

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        onBackdropClick={() => setShow(false)}
      >
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
          <Box sx={{ mb: 8, textAlign: 'left' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              Send Test Email
            </Typography>
          </Box>
          <form>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <Typography>Send Test Email to:</Typography>
                </Grid>
                <Grid item xs={2} sm={2}>
                  <TextField
                    fullWidth
                    placeholder='first Name'
                    value={formData.first_name}
                    onChange={e => handleFormChange('first_name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={2} sm={2}>
                  <TextField
                    fullWidth
                    placeholder='Last Name'
                    value={formData.last_name}
                    onChange={e => handleFormChange('last_name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    fullWidth
                    placeholder='Email'
                    value={formData.email}
                    onChange={e => handleFormChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    fullWidth
                    placeholder='Position'
                    value={formData.position}
                    onChange={e => handleFormChange('position', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant='contained' sx={{ mr: 1 }} onClick={() => setShow(false)}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogSendTestEmail
