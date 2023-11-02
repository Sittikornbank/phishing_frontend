// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'

// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Icon Import
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DialogEdit from '../pages/usergroup/DialogEdit'
import DialogDelete from '../pages/usergroup/DialogDelete'
import { useDeleteGroupMutation } from 'src/store/api'
import { useAuth } from 'src/hooks/useAuth'

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
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

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const GroupTable = ({ data, refetch }) => {
  const auth = useAuth()

  const columns = [
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Name',
      field: 'name',
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.name}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'modified_date',
      headerName: 'Modified Date',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {ConvertDate(params.row.modified_date)}
        </Typography>
      )
    },

    {
      flex: 0.125,
      field: 'target_count',
      minWidth: 80,
      headerName: 'Target Count',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.targets ? params.row.targets.length : 0}
        </Typography>
      )
    },

    {
      flex: 0.275,
      maxWidth: 180,
      headerName: 'Action',
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton color='primary' onClick={() => openDialog(row)}>
              <EditIcon sx={{ fontSize: 26 }} />
            </IconButton>
            {auth.user.role === 'superadmin' && (
              <IconButton color='error' onClick={() => deleteDialog(row)}>
                <DeleteForeverIcon sx={{ fontSize: 26 }} />
              </IconButton>
            )}
          </>
        )
      }
    }
  ]

  // ** States
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [dataCurrent, setDataCurrent] = useState({})
  const [open_Dialog, setOpenDialog] = useState(false)
  const [open_Delete, setOpenDelete] = useState(false)

  const [DeleteGroup] = useDeleteGroupMutation()

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleDelClose = () => (setOpenDelete(false), setDataCurrent(() => {}))

  const openDialog = data_select => {
    if (!open_Dialog) {
      setOpenDialog(true)
      setDataCurrent(data_select)
    } else {
      setOpenDialog(false)
      setDataCurrent({})
    }
  }

  const deleteDialog = data_select => {
    setOpenDelete(true)
    setDataCurrent(() => data_select)
  }

  const DeleteData = async id => {
    await DeleteGroup(id)
    setOpenDelete(false)
    auth.addMessage('Delete Success', 'success')
    refetch()
  }

  return (
    <>
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[10, 15, 20, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data || []}
        slotProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value)
          }
        }}
      />

      <DialogEdit show={open_Dialog} setShow={setOpenDialog} refetch={refetch} data={dataCurrent} />
      <DialogDelete handleClose={handleDelClose} open={open_Delete} data={dataCurrent} DeleteData={DeleteData} />
    </>
  )
}

export default GroupTable
