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
  email_content: '',
  landing_page: true
}

const DialogImportEmail = props => {
  // ** States
  const { show, setShow } = props
  const [formData, setFormData] = useState(initialData)

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

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
              Import Email
            </Typography>
          </Box>
          <form>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <Typography>Email Content:</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    multiline
                    fullWidth
                    rows={8}
                    variant='filled'
                    placeholder='Raw Email Source'
                    value={formData.email_content}
                    onChange={e => handleFormChange('email_content', e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box display='flex' alignItems='center'>
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.landing_page}
                          onChange={e => handleFormChange('landing_page', e.target.checked)}
                          name='landing_page'
                        />
                      }
                      label='Change Links to Point to Landing Page'
                    />
                  </Box>
                </Box>
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
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogImportEmail
