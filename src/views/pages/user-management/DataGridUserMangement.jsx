// ** React Imports
import { useEffect, useMemo, useState } from 'react'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// Icon Import
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import CachedIcon from '@mui/icons-material/Cached'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDeleteUserMutation, useGetUsersAPIQuery } from 'src/store/api'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'
import { IconButton } from '@mui/material'
import DialogEdit from './dialogEdit'
import DialogDelete from './DialogDelete'
import { useAuth } from 'src/hooks/useAuth'

const statusObj = {
  0: { title: 'Active', color: 'success' },
  1: { title: 'Locked', color: 'error' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
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

const DataGridUserMangement = ({ usersAPI }) => {
  const columns = [
    {
      flex: 0.275,
      minWidth: 290,
      field: 'username',
      headerName: 'Username'
    },

    {
      flex: 0.275,
      minWidth: 80,
      field: 'role',
      headerName: 'Role'
    },

    {
      flex: 0.275,
      minWidth: 10,
      field: 'is_active',
      headerName: 'Active',
      renderCell: params => {
        const dataActive = params.row.is_active ? 0 : 1
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
      flex: 0.275,
      minWidth: 250,
      field: 'last_login',
      headerName: 'Last Login',
      renderCell: ({ row }) => (row.last_login ? ConvertDate(row.last_login) : '-')
    },

    {
      flex: 0.275,
      minWidth: 100,
      headerName: 'Action',
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton color='primary'>
              <CachedIcon sx={{ fontSize: 26 }} />
            </IconButton>
            <IconButton color='primary' onClick={() => openDialog(row)}>
              <DriveFileRenameOutlineIcon sx={{ fontSize: 26 }} />
            </IconButton>
            <IconButton color='error' onClick={() => deleteDialog(row)}>
              <DeleteForeverIcon sx={{ fontSize: 26 }} />
            </IconButton>
          </>
        )
      }
    }
  ]

  const [deleteUsers] = useDeleteUserMutation()
  let usersData = useMemo(() => (!usersAPI.isLoading ? usersAPI.data?.users : []), [usersAPI])

  // ** States
  const [data, setData] = useState(() => usersData)
  const [dataCurrent, setDataCurrent] = useState({})
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [open_Dialog, setOpenDialog] = useState(false)
  const [open_Delete, setOpenDelete] = useState(false)

  const auth = useAuth()

  const openDialog = data_select => {
    console.log(data_select)
    if (!open_Dialog) {
      setOpenDialog(true)
      setDataCurrent(data_select)
    } else {
      setOpenDialog(false)
      setDataCurrent({})
    }
  }

  const handleDelClose = () => (setOpenDelete(false), setCurrentData(() => {}))

  const deleteDialog = data_select => {
    setOpenDelete(true)
    setDataCurrent(() => data_select)
  }

  const DeleteData = async id => {
    await deleteUsers(id)
    setOpenDelete(false)
    auth.addMessage('Delete Success', 'success')
    usersAPI.refetch()
  }

  useEffect(() => {
    setData(() => usersData)
  }, [usersData])

  const handleSearch = searchValue => {
    setSearchText(searchValue)

    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return row[field] ? searchRegex.test(row[field].toString()) : ''
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  return (
    <>
      <DataGrid
        autoHeight
        disableColumnSelector
        columns={columns}
        loading={usersAPI.isLoading}
        MenuProps={{ disablePortal: true }}
        pageSizeOptions={[10, 15, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data}
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
      <DialogEdit show={open_Dialog} setShow={setOpenDialog} data={dataCurrent} refetch={() => usersAPI.refetch()} />
      <DialogDelete handleClose={handleDelClose} open={open_Delete} data={dataCurrent} DeleteData={DeleteData} />
    </>
  )
}

export default DataGridUserMangement
