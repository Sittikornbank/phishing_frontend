// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// MUI Icon import
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'

// ** Custom Components
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

import { useDeleteLandingPageMutation, useGetLandingPageQuery } from 'src/store/api'
import { IconButton } from '@mui/material'
import DialogDelete from '../landingpage/DialogDelete'
import DialogEdit from '../landingpage/DialogEdit'
import DialogAdd from '../landingpage/DialogAdd'

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

const columns = (handleDelOpen, handleEditOpen) => [
  {
    flex: 1,
    field: 'name',
    minWidth: 150,
    headerName: 'Name'
  },
  {
    flex: 0.275,
    minWidth: 100,
    headerName: 'Action',
    renderCell: ({ row }) => {
      return (
        <>
          <IconButton color='primary'>
            <EditIcon sx={{ fontSize: 26 }} onClick={() => handleEditOpen(row)} />
          </IconButton>
          <IconButton color='error' onClick={() => handleDelOpen(row)}>
            <DeleteForeverIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </>
      )
    }
  }
]

const LandingpageTable = () => {
  // ** States
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Redux
  const landingpage = useGetLandingPageQuery()
  const [deleteLangingPage] = useDeleteLandingPageMutation()

  const [currentData, setCurrentData] = useState({})

  // ** Handle Delete Dialog
  const [delDialog, setDelDialog] = useState(false)

  const handleDelOpen = (row = {}) => {
    setCurrentData(() => row)
    setDelDialog(true)
  }
  const handleDelClose = () => (setDelDialog(false), setCurrentData(() => {}))

  const DeleteData = async id => {
    await deleteLangingPage(id)
    setDelDialog(false)
    landingpage.refetch()
  }

  // ** Handle Edit Dialog
  const [editDialog, setEditDialog] = useState(false)

  const handleEditOpen = (row = {}) => {
    setCurrentData(() => row)
    setEditDialog(true)
  }

  const handleEditClose = () => setEditDialog(false)

  useEffect(() => {
    if (!landingpage.isLoading) {
      setData(landingpage.data.site_templates)
    }
  }, [landingpage])

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
    <>
      <DataGrid
        autoHeight
        columns={columns(handleDelOpen, handleEditOpen, setCurrentData)}
        pageSizeOptions={[10, 20, 30, 40, 50]}
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
      <DialogEdit handleClose={handleEditClose} open={editDialog} data={currentData} />
      <DialogDelete handleClose={handleDelClose} open={delDialog} data={currentData} DeleteData={DeleteData} />
    </>
  )
}

export default LandingpageTable
