// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Import
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import { IconButton } from '@mui/material'

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

const TargetGroupTable = ({ data, setUserDataTarget }) => {
  const columns = [
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Name',
      field: 'name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.firstname} {params.row.lastname}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'email',
      headerName: 'E-Mail',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.email}
        </Typography>
      )
    },

    {
      flex: 0.125,
      field: 'position',
      minWidth: 80,
      headerName: 'Position',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.position}
        </Typography>
      )
    },
    {
      flex: 0.1,
      headerName: 'Actions',
      sortable: false,
      minWidth: 80,
      renderCell: params => (
        <IconButton color='error' onClick={() => handleDelete(params.row.id)}>
          <DeleteForeverIcon sx={{ fontSize: 26 }} />
        </IconButton>
      )
    }
  ]

  // ** States
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleDelete = rowId => {
    const updatedData = data.filter(row => row.id !== rowId)
    setUserDataTarget(() => updatedData)
  }

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

  return (
    <DataGrid
      sx={{ height: 400 }}
      columns={columns}
      pageSizeOptions={[10, 15, 20, 25, 50]}
      paginationModel={paginationModel}
      slots={{ toolbar: QuickSearchToolbar }}
      onPaginationModelChange={setPaginationModel}
      rows={filteredData.length ? filteredData : data ? data : []}
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
  )
}

export default TargetGroupTable
