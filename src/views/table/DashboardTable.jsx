import NextLink from 'next/link'

// ** MUI Imports
import CustomChip from 'src/@core/components/mui/chip'
import { IconButton, Switch } from '@mui/material'
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
import DialogDeleteCampains from '../pages/campains/DialogDeleteCampains'
import { use, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useDeleteCampaignMutation, useLuachCampaineMutation } from 'src/store/api'

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

function ConvertDate(date) {
  var created_date = new Date(date)
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var year = created_date.getFullYear()
  var month = months[created_date.getMonth()]
  var date = created_date.getDate()
  var hour = ('0' + created_date.getHours()).slice(-2)
  var min = ('0' + created_date.getMinutes()).slice(-2)
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min // final date with time, you can use this according your requirement

  return time
}

const statusObj = {
  running: { title: 'Running', color: 'primary' },
  complete: { title: 'Complete', color: 'success' },
  fail: { title: 'Fail', color: 'error' },
  idle: { title: 'Idle', color: 'error' }
}

const DashboardTable = ({ rows, isLoading, Refetch }) => {
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
      renderCell: ({ row }) => (row.created_date ? ConvertDate(row.created_date) : '-')
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

    // {
    //   flex: 0.25,
    //   minWidth: 5,
    //   field: 'total',
    //   headerName: 'Total',
    //   renderCell: ({ row }) => row.stats.total
    // },

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
      minWidth: 120,
      field: 'Lunch Campaign',
      headerName: 'Lunch Campaign',
      renderCell: params => {
        const dataActive = params.row.status
        const status = statusObj[dataActive]

        return <Switch label='Lunch Campaign' onChange={() => StartLunchCampaign(params.row.id)} />
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
            <IconButton color='error' onClick={() => deleteDialog(row)}>
              <DeleteForeverIcon sx={{ fontSize: 26 }} />
            </IconButton>
          </>
        )
      }
    }
  ]

  const [open_Delete, setOpenDelete] = useState(false)
  const [dataCurrent, setDataCurrent] = useState({})
  const auth = useAuth()
  const handleDelClose = () => (setOpenDelete(false), setDataCurrent(() => {}))
  const [DeleteCampaign] = useDeleteCampaignMutation()
  const [LunchCampaign] = useLuachCampaineMutation()

  const StartLunchCampaign = async id => {
    await LunchCampaign(id)
    auth.addMessage('Lunch Success', 'success')
    Refetch()
  }

  const deleteDialog = data_select => {
    setOpenDelete(true)
    setDataCurrent(() => data_select)
  }

  const DeleteData = async id => {
    await DeleteCampaign(id)
    setOpenDelete(false)
    auth.addMessage('Delete Success', 'success')
    Refetch()
  }

  return (
    <>
      <DataGrid columns={columns} rows={rows || []} slots={{ toolbar: CustomToolbar }} autoHeight loading={isLoading} />
      <DialogDeleteCampains
        handleClose={handleDelClose}
        open={open_Delete}
        data={dataCurrent}
        DeleteData={DeleteData}
      />
    </>
  )
}

export default DashboardTable
