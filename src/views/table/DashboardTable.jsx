import NextLink from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomChip from 'src/@core/components/mui/chip'
import { IconButton } from '@mui/material'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector
} from '@mui/x-data-grid'

// MUI Icon import
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AssessmentIcon from '@mui/icons-material/Assessment'

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
  running: { title: 'Running', color: 'primary' },
  complete: { title: 'Complete', color: 'success' },
  fail: { title: 'Fail', color: 'error' }
}

const DashboardTable = ({ rows, isLoading }) => {
  const columns = [
    {
      flex: 0.1,
      field: 'name',
      minWidth: 150,
      headerName: 'Name'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'create_date',
      headerName: 'Created Date',
      renderCell: ({ row }) => (row.created_date ? row.created_date : '-')
    },

    {
      flex: 0.25,
      minWidth: 5,
      field: 'sent',
      headerName: 'Sent',
      renderCell: ({ row }) => row.stats.sent
    },
    {
      flex: 0.25,
      minWidth: 5,
      field: 'open',
      headerName: 'Opened',
      renderCell: ({ row }) => row.stats.open
    },
    {
      flex: 0.25,
      minWidth: 5,
      field: 'click',
      headerName: 'Clicked',
      renderCell: ({ row }) => (row.stats.click != '' ? row.stats.click : '-')
    },

    {
      flex: 0.25,
      minWidth: 5,
      field: 'submit',
      headerName: 'Submitted',
      renderCell: ({ row }) => row.stats.submit
    },
    {
      flex: 0.25,
      minWidth: 5,
      field: 'fail',
      headerName: 'Failed',
      renderCell: ({ row }) => row.stats.fail
    },
    {
      flex: 0.25,
      minWidth: 5,
      field: 'report',
      headerName: 'Reported',
      renderCell: ({ row }) => row.stats.report
    },
    {
      flex: 0.25,
      minWidth: 5,
      field: 'total',
      headerName: 'Total',
      renderCell: ({ row }) => row.stats.total
    },

    {
      flex: 0.275,
      minWidth: 120,
      field: 'status',
      headerName: 'Status',
      renderCell: params => {
        const dataActive = params.row.status
        const status = statusObj[dataActive]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={status?.color}
            label={status?.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },

    {
      flex: 0.275,
      minWidth: 100,
      headerName: 'Action',
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton color='primary' component={NextLink} href={'/dashboards/' + row.id}>
              <AssessmentIcon sx={{ fontSize: 26 }} />
            </IconButton>
            <IconButton color='error'>
              <DeleteForeverIcon sx={{ fontSize: 26 }} />
            </IconButton>
          </>
        )
      }
    }
  ]

  return <DataGrid columns={columns} rows={rows} slots={{ toolbar: CustomToolbar }} autoHeight loading={isLoading} />
}

export default DashboardTable
