// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'

const columns = [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 80,
    headerName: 'Name'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'create_date',
    headerName: 'Created Date',
    renderCell: ({ row }) => (row.create_date ? row.create_date : '-')
  },

  {
    flex: 0.25,
    minWidth: 200,
    field: 'stats',
    headerName: 'Status',
    renderCell: ({ row }) => (row.status ? row.status : '-')
  }

  // {
  //   flex: 0.25,
  //   minWidth: 200,
  //   headerName: 'Clicked',
  //   renderCell: ({ row }) => (row.stats.clicked ? row.stats.clicked : '-')
  // },

  // {
  //   flex: 0.25,
  //   minWidth: 200,
  //   headerName: 'Submitted',
  //   renderCell: ({ row }) => (row.stats.submitted ? row.stats.submitted : '-')
  // }

  // {
  //   flex: 0.25,
  //   minWidth: 200,
  //   field: 'stats',
  //   headerName: 'Reported',
  //   renderCell: ({ row }) => (row.reported ? row.reported : '-')
  // },

  // {
  //   flex: 0.25,
  //   minWidth: 200,
  //   field: 'stats',
  //   headerName: 'Failed',
  //   renderCell: ({ row }) => (row.failed ? row.failed : '-')
  // }
]

const DashboardTable = ({ rows, isLoading }) => {
  return <DataGrid columns={columns} rows={rows} loading={isLoading} />
}

export default DashboardTable
