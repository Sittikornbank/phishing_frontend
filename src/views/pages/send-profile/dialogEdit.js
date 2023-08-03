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
import DialogSendTestEmail from './dialogSendTestEmail'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'header',
    numeric: false,
    disablePadding: false,
    label: 'Header'
  },
  {
    id: 'value',
    numeric: false,
    disablePadding: false,
    label: 'Value'
  }
]

function EnhancedTableHead(props) {
  // ** Props
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell size='small'></TableCell>
      </TableRow>
    </TableHead>
  )
}

const initialData = {
  name: '',
  interface_type: 'SMTP',
  smtp: '',
  host: '',
  username: '',
  password: '',
  certificate: ''
}

const DialogEdit = props => {
  // ** States
  const { show, setShow, data } = props

  if (!show) {
    return null
  }

  const [formData, setFormData] = useState(data || initialData)
  const [headers, setHeaders] = useState([])
  const [header, setHeader] = useState('')
  const [value, setValue] = useState('')
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderBy, setOrderBy] = useState('header')
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  console.log('data', data)
  console.log('formData', formData)
  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleAddHeader = () => {
    const newValue = [{ header: header, value: value }]

    setHeader('')
    setValue('')
    setHeaders(current => [...current, ...newValue])
  }

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
        // onClose={() => setShow(false)}
        TransitionComponent={Transition}
        // onBackdropClick={() => setShow(false)}
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
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Sending Profile
            </Typography>
          </Box>
          <form>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <Typography>Name:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    placeholder='Profile Name'
                    value={formData.name}
                    onChange={e => handleFormChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Interface Type:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    disabled
                    value={formData.interface_type}
                    onChange={e => handleFormChange('interface_type', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>
                    <Box display='flex'>
                      <Box>SMTP From:</Box>
                      <Tooltip
                        title='Set this to an email address from your sending domain to bypass SPF-checks. You can set the Envelope Sender in Email Templates. The Envelope Sender is shown to the user.'
                        placement='right-end'
                        arrow
                      >
                        <Box>
                          <Icon icon='ph:question-fill' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    placeholder='First Last <test@example.com>'
                    fullWidth
                    value={formData.smtp}
                    onChange={e => handleFormChange('smtp', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Host:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    placeholder='smtp.example.com:25'
                    fullWidth
                    value={formData.host}
                    onChange={e => handleFormChange('host', e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography>Username:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    placeholder='username'
                    value={formData.username}
                    onChange={e => handleFormChange('username', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Password:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    type='password'
                    placeholder='password'
                    value={formData.password}
                    onChange={e => handleFormChange('password', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box display='flex' alignItems='center'>
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.certificate}
                            onChange={e => handleFormChange('certificate', e.target.checked)}
                            name='certificate'
                          />
                        }
                        label='Ignore Certificate Errors'
                      />
                    </Box>
                    <Box>
                      <Tooltip
                        title='Ignore common certificate errors such as self-signed certs (exposes you to MiTM attacks - use carefully!)'
                        placement='right-end'
                        arrow
                      >
                        <Box>
                          <Icon icon='ph:question-fill' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Email Headers:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={6}>
                    <Grid item xs={3} sm={3}>
                      <TextField
                        fullWidth
                        placeholder='X-Custom-Header'
                        value={header}
                        onChange={e => setHeader(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                      <TextField
                        fullWidth
                        placeholder='{{.URL}}-gophish'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Button variant='contained' color='primary' onClick={() => handleAddHeader()}>
                        <Icon icon='mdi:add' />
                        Add cutom header
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                      <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        rowCount={headers.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        // onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(headers, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`

                            return (
                              <TableRow hover tabIndex={-1} key={row.header} role='checkbox'>
                                <TableCell align='left'>{row.header}</TableCell>
                                <TableCell align='left'>{row.value}</TableCell>
                                <TableCell align='left' size='small'>
                                  <Button
                                    color='error'
                                    size='small'
                                    variant='contained'
                                    sx={{ marginLeft: '4px' }}
                                    onClick={e => clickDelete(row)}
                                  >
                                    <Icon icon='ic:baseline-delete' />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        {emptyRows > 0 && (
                          <TableRow
                            sx={{
                              height: 53 * emptyRows
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    page={page}
                    component='div'
                    count={headers.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button variant='contained' sx={{ mr: 1 }} onClick={() => setOpen(true)}>
                    Send Test Email
                  </Button>
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
            Save Profile
          </Button>
        </DialogActions>
      </Dialog>
      <DialogSendTestEmail show={open} setShow={setOpen} />
    </Card>
  )
}

export default DialogEdit
