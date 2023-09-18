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

// ** Demo Components Imports
// import EditorControlled from 'src/views/forms/form-elements/editor/EditorControlled'
// import EditorUncontrolled from 'src/views/forms/form-elements/editor/EditorUncontrolled'
import { EditorState, convertToRaw } from 'draft-js'

import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import DialogImportEmail from './DialogImportEmail'

// import { EditorState } from 'draft-js'

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

import { useForm, Controller } from 'react-hook-form'

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

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
    setError
  } = useForm()

  const SubmitEmailTemplate = async data => {
    const contentState = editorState.getCurrentContent()
    data.html = contentState.getPlainText()
    console.log(data)
  }

  const getPlainText = editorState => {
    const contentState = editorState.getCurrentContent()
    console.log(contentState.getPlainText())

    return contentState.getPlainText()
  }

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
        <form onSubmit={handleSubmit(SubmitEmailTemplate)}>
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
                New Email Template
              </Typography>
            </Box>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <Typography>Name:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Template Name is required' }}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        placeholder='Template Name'
                        {...field}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ''}
                      />
                    )}
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
                  <Controller
                    name='envelope_sender'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Envelope Sender is required' }}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        placeholder='First Last <test@example.com>'
                        type='text'
                        {...field}
                        error={!!errors.envelope_sender}
                        helperText={errors.envelope_sender ? errors.envelope_sender.message : ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography>Subject:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='subject'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Subject is required' }}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        placeholder='Envelope Sender'
                        {...field}
                        error={!!errors.subject}
                        helperText={errors.subject ? errors.subject.message : ''}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='editorContent'
                    control={control}
                    defaultValue={convertToRaw(editorState.getCurrentContent())}
                    render={({ field }) => (
                      <EditorWrapper>
                        <ReactDraftWysiwyg editorState={editorState} onEditorStateChange={setEditorState} />
                      </EditorWrapper>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Typography>Attachments :</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name='attachments[0]'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Attachments is required' }}
                    render={({ field }) => (
                      <TextField
                        autoFocus
                        fullWidth
                        placeholder='Attachments'
                        {...field}
                        error={!!errors['attachments[0]']}
                        helperText={errors['attachments[0]'] ? errors['attachments[0]'].message : ''}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
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
            <Button variant='contained' type='submit' sx={{ mr: 1 }}>
              Save Profile
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DialogImportEmail show={open} setShow={setOpen} />
    </Card>
  )
}

export default DialogAdd
