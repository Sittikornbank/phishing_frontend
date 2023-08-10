import NextLink from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomChip from 'src/@core/components/mui/chip'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector
} from '@mui/x-data-grid'
import { Icon, IconButton } from '@mui/material'

// MUI Icon import
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

const csvOptions = { delimiter: '', utf8WithBom: true }
function CustomExportButton(props) {
  return (
    <GridToolbarExportContainer {...props}>
      <GridCsvExportMenuItem options={csvOptions} />
    </GridToolbarExportContainer>
  )
}

function CustomToolbar(props) {
  return (
    <GridToolbarContainer sx={{ my: 1, fontSize: '1rem' }} {...props}>
      <CustomExportButton />
    </GridToolbarContainer>
  )
}

const statusObj = {
  create_campaign: { title: 'Create Campaign', color: 'error' },
  launch_campaign: { title: 'Launch Campaign', color: 'error' },
  complete_campaign: { title: 'Complete Campaign', color: 'error' },
  fail: { title: 'Fail', color: 'error' },
  send_email: { title: 'Send Email', color: 'error' },
  open_email: { title: 'Open Email', color: 'error' },
  click_link: { title: 'Click Link', color: 'success' },
  submit_data: { title: 'Submit Data', color: 'primary' },
  report: { title: 'Report', color: 'error' }
}

const UserGroupDetailTable = props => {
  const { data, isLoading } = props

  const columns = [
    {
      flex: 0.1,
      field: 'firstname',
      minWidth: 120,
      headerName: 'First Name'
    },
    {
      flex: 0.1,
      field: 'lastname',
      minWidth: 120,
      headerName: 'Last Name'
    },
    {
      flex: 0.1,
      field: 'email',
      minWidth: 280,
      headerName: 'Email'
    },
    {
      flex: 0.1,
      field: 'position',
      minWidth: 80,
      headerName: 'Position'
    },
    {
      flex: 0.275,
      minWidth: 10,
      maxWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: params => {
        const dataActive = params.row.status
        const status = statusObj[dataActive]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={status.color}
            label={status.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      field: 'report_date',
      minWidth: 80,
      headerName: 'Reported',
      renderCell: ({ row }) => {
        return row?.report_date == 'NaT' ? (
          <Icon color='error'>
            <CancelIcon sx={{ fontSize: 26 }} />
          </Icon>
        ) : (
          <Icon color='primary'>
            <CheckCircleIcon sx={{ fontSize: 26 }} />
          </Icon>
        )
      }
    }
  ]

  return (
    <DataGrid
      columns={columns}
      getRowId={row => row.r_id}
      slots={{ toolbar: CustomToolbar }}
      rows={data}
      autoHeight
      loading={isLoading}
    />
  )
}

export default UserGroupDetailTable
