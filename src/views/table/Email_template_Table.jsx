// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Data Import
import { useGetEmailTemplatesQuery } from 'src/store/api'
import { IconButton, Tooltip } from '@mui/material'

// ** Icon Import
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { ContentCopy } from '@mui/icons-material'

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

const Email_template_Table = () => {
  const columns = [
    {
      flex: 0.2,
      type: 'date',
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
      flex: 0.275,
      minWidth: 100,
      headerName: 'Action',
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title='Edit' placement='top' arrow>
              <IconButton color='primary'>
                <EditIcon sx={{ fontSize: 26 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Copy' placement='top' arrow>
              <IconButton color='primary' onClick={() => handleCopyRow(row)}>
                <ContentCopy sx={{ fontSize: 26 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete' placement='top' arrow>
              <IconButton color='error'>
                <DeleteForeverIcon sx={{ fontSize: 26 }} />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    }
  ]

  const template = useGetEmailTemplatesQuery()
  let templateData = !template.isLoading ? template.data?.email_templates : []

  // ** States
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleCopyRow = rowData => {
    const textToCopy = `Name: ${rowData.name}, Modified Date: ${ConvertDate(rowData.modified_date)}`
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log('Copied to clipboard:', textToCopy)
      })
      .catch(error => {
        console.error('Error copying to clipboard:', error)
      })
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
      autoHeight
      columns={columns}
      loading={template.isLoading}
      pageSizeOptions={[7, 10, 25, 50]}
      paginationModel={paginationModel}
      slots={{ toolbar: QuickSearchToolbar }}
      onPaginationModelChange={setPaginationModel}
      rows={templateData}
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

export default Email_template_Table
