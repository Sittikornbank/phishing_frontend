// ** React Imports
import { useEffect, useMemo, useState } from 'react'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// Icon Import
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import CachedIcon from '@mui/icons-material/Cached'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDeleteSmtpDataMutation, useGetSmtpDataQuery } from 'src/store/api'

import { IconButton } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import DialogDelete from './DialogDelete'

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

export default function TableSendProfile() {
  const columns = [
    {
      flex: 0.275,
      minWidth: 290,
      field: 'interface_type',
      headerName: 'Interface Type'
    },

    {
      flex: 0.275,
      minWidth: 80,
      field: 'name',
      headerName: 'Name'
    },

    {
      flex: 0.275,
      minWidth: 250,
      field: 'modified_date',
      headerName: 'Last Modified',
      renderCell: ({ row }) => (row.modified_date ? ConvertDate(row.modified_date) : '-')
    },

    {
      flex: 0.275,
      minWidth: 100,
      headerName: 'Action',
      renderCell: ({ row }) => {
        return (
          <>
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

  const smtpData = useGetSmtpDataQuery()
  const [DelSmtp] = useDeleteSmtpDataMutation()

  const [data, setData] = useState([])
  const [dataCurrent, setDataCurrent] = useState({})
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [open_Dialog, setOpenDialog] = useState(false)
  const [open_Delete, setOpenDelete] = useState(false)
  const auth = useAuth()

  let smtpData_rows = useMemo(() => (!smtpData.isLoading ? smtpData.data?.smtp : []), [smtpData])

  useEffect(() => {
    setData(() => smtpData_rows)
  }, [smtpData_rows])

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

  const handleDelClose = () => (setOpenDelete(false), setDataCurrent(() => {}))

  const deleteDialog = data_select => {
    setOpenDelete(true)
    setDataCurrent(() => data_select)
  }

  const DeleteData = async id => {
    await DelSmtp(id)
    setOpenDelete(false)
    auth.addMessage('Delete Success', 'success')
    smtpData.refetch()
  }

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    console.log(searchValue)

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
        loading={smtpData.isLoading}
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
      <DialogDelete handleClose={handleDelClose} open={open_Delete} data={dataCurrent} DeleteData={DeleteData} />
    </>
  )
}
