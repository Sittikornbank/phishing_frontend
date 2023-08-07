/* eslint-disable react-hooks/rules-of-hooks */
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
  Fab,
  Input,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  Tooltip
} from '@mui/material'

import CardSnippet from 'src/@core/components/card-snippet'
import * as source from 'src/views/forms/form-elements/editor/EditorSourceCode'

// ** Demo Components Imports
import EditorControlled from 'src/views/forms/form-elements/editor/EditorControlled'
import EditorUncontrolled from 'src/views/forms/form-elements/editor/EditorUncontrolled'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import DialogImportEmail from './DialogImportEmail'

// import DialogSendTestEmail from './dialogSendTestEmail'

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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const initialData = {
  subject: '',
  attachments: '',
  visible: 'none',
  org_id: null,
  html: '',
  envelope_sender: '',
  name: '',
  image_email: '',
  tracking: '',
  text: ''
}

const DialogAdd = props => {
  // ** States
  const { show, setShow, data } = props

  if (!show) {
    return null
  }
  const [formData, setFormData] = useState(data || initialData)
  const [files, setFiles] = useState([])
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderBy, setOrderBy] = useState('header')
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleAddfile = e => {
    console.log('e', e)

    setFiles(current => [...current, e.target.value])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const clickDelete = e => {
    setFiles(current => [
      ...files.filter(function (v) {
        return v !== e
      })
    ])
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - files.length) : 0

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
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
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              New Sending Profile
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
                    placeholder='Template Name'
                    value={formData.envelope_sender}
                    onChange={e => handleFormChange('envelope_sender', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button variant='contained' sx={{ mr: 1 }} onClick={() => setOpen(true)}>
                    import Email
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>
                    <Box display='flex'>
                      <Box>Envelope Sender:</Box>
                      <Tooltip
                        title='This sender is shown to the user by most email clients. Defaults to the SMTP From as defined in the Sending Profile.'
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
                    fullWidth
                    placeholder='First Last <test@example.com>'
                    value={formData.name}
                    onChange={e => handleFormChange('name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Subject:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    placeholder='Email Subject'
                    value={formData.subject}
                    onChange={e => handleFormChange('subject', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                    <Tab label='Text' {...a11yProps(0)} />
                    <Tab label='HTML' {...a11yProps(1)} />
                  </Tabs>
                </Grid>

                {value === 0 && (
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      fullWidth
                      rows={8}
                      variant='filled'
                      placeholder='Plaintext'
                      value={formData.text}
                      onChange={e => handleFormChange('text', e.target.value)}
                    />
                  </Grid>
                )}
                {value === 1 && (
                  <EditorWrapper>
                    <Grid container spacing={6} className='match-height'>
                      <Grid item xs={12}>
                        <CardSnippet
                          sx={{ overflow: 'visible' }}
                          title=''
                          code={{
                            tsx: null,
                            jsx: source.EditorUncontrolledJSXCode
                          }}
                        >
                          <EditorUncontrolled />
                        </CardSnippet>
                      </Grid>
                    </Grid>
                  </EditorWrapper>
                )}
                <Grid item xs={12} sm={12}>
                  <Box display='flex' alignItems='center'>
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.tracking}
                            onChange={e => handleFormChange('tracking', e.target.checked)}
                            name='Tracking'
                          />
                        }
                        label='Add Tracking Image'
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Grid container spacing={6}>
                    <Grid item xs={4} sm={4}>
                      <Input
                        id='contained-button-file-logo'
                        name='assets'
                        type='file'
                        style={{ display: 'none' }}
                        onChange={e => handleAddfile(e)}

                        // inputProps={{ multiple: true }}
                      />
                      <label htmlFor='contained-button-file-logo'>
                        <Button margin='10' component='span' variant='contained' color='primary'>
                          <Icon icon='mdi:add' />
                          Add files
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                      <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        rowCount={files.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                      />
                      <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(files, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`

                            return (
                              <TableRow hover tabIndex={-1} key={row} role='checkbox'>
                                <TableCell align='left'>{row}</TableCell>

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
                    count={files.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
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
            Save Profile
          </Button>
        </DialogActions>
      </Dialog>
      <DialogImportEmail show={open} setShow={setOpen} />
    </Card>
  )
}

export default DialogAdd
