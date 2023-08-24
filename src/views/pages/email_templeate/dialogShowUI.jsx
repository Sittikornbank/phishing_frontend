
// ** MUI Imports
import { Box, Dialog, DialogContent, Fade, IconButton, Typography } from "@mui/material"
import { forwardRef } from "react";

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

export default function DialogShowUI({ show, dataEdit, setShowEdit }) {
  console.log(show);

  return (
    <Dialog
      fullWidth
      open={show}
      maxWidth='xl'
      fullScreen
      scroll='body'
      onClose={() => setShowEdit(false)}
      TransitionComponent={Transition}
      onBackdropClick={() => setShowEdit(false)}
    >
      <DialogContent
        sx={{
          position: 'relative',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton
          size='small'
          onClick={() => setShowEdit(false)}
          sx={{ position: 'fixed', right: '1.5rem', top: '1rem' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ mb: 3 }}>
            {dataEdit?.name}
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <div style={{position: 'relative'}} dangerouslySetInnerHTML={{__html: dataEdit?.html}} />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
