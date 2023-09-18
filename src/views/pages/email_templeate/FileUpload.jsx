// ** React Imports
import { useCallback, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 'fit-content',
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 160
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderLandingPage = ({ setData, data }) => {
  // ** State
  const [files, setFiles] = useState([])

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      console.log(acceptedFiles)

      // Read the file as a base64 string
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result
        console.log(base64Data)
        setData({
          ...data,
          image_site: base64Data
        })
      }
      reader.readAsDataURL(file)
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const img = files.map(file => {
    return <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
  })

  return (
    <>
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 200 } : {}}>
        <input {...getInputProps()} />

        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Img alt='Upload img' src='/images/misc/upload.png' />
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
              Drop files here or click{' '}
              <Link href='/' onClick={e => e.preventDefault()}>
                browse
              </Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </Box>
      </Box>
      {files.length && img}
    </>
  )
}

export default FileUploaderLandingPage
