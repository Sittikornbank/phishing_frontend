// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
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

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'
import { IconButton } from '@mui/material'

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns = [
  {
    flex: 0.275,
    minWidth: 290,
    field: 'username',
    headerName: 'Username'
  },

  {
    flex: 0.275,
    minWidth: 290,
    field: 'role',
    headerName: 'Role'
  },

  {
    flex: 0.275,
    minWidth: 290,
    field: 'last_login',
    headerName: 'Last Login'
  },

  {
    flex: 0.275,
    minWidth: 290,
    headerName: 'Action',
    renderCell: ({ row }) => {
      return (
        <>
          <IconButton color='primary'>
            <CachedIcon sx={{ fontSize: 26 }} />
          </IconButton>
          <IconButton color='primary'>
            <DriveFileRenameOutlineIcon sx={{ fontSize: 26 }} />
          </IconButton>
          <IconButton color='primary'>
            <DeleteForeverIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </>
      )
    }
  }
]

const DataGridUserMangement = () => {
  // ** States
  const [data] = useState(rows)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

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
      autoHeight
      disableColumnSelector
      columns={columns}
      loading={false}
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
  )
}

export default DataGridUserMangement
