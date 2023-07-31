import React from 'react'
import GrapDashboards from 'src/views/dashboards/GrapDashborads'
import LineChartDashboard from 'src/views/charts/LineChartDashboard'
import TableStickyHeader from 'src/views/table/mui/TableStickyHeader'
import BarChartDashboard from 'src/views/charts/BarChartDashboard'

import Typography from '@mui/material/Typography'

// MUI
import Grid from '@mui/material/Grid'

function Dashboard() {
  return (
    <>
      <Grid container sx={{ my: [0, 4, 1.625] }} spacing={5}>
        <Grid item xs={12} sx={{ mb: [3, 0] }}>
          <GrapDashboards />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
          <LineChartDashboard />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
          <BarChartDashboard />
        </Grid>
      </Grid>

      <Typography variant='h3' sx={{ my: 8 }}>
        Recent Campaigns
      </Typography>
      <TableStickyHeader />
    </>
  )
}

Dashboard.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Dashboard
