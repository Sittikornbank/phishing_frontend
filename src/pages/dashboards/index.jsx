import React, { useEffect, useState } from 'react'
import GrapDashboards from 'src/views/dashboards/GrapDashboards'
import LineChartDashboard from 'src/views/dashboards/LineChartDashboard'
import TableStickyHeader from 'src/views/table/mui/TableStickyHeader'

import Typography from '@mui/material/Typography'

// MUI
import Grid from '@mui/material/Grid'

// Redux API
import { useGetCampaigns_summaryQuery } from 'src/store/api'
import { useGetOverViewsQuery } from 'src/store/api'

import DashboardTable from 'src/views/table/DashboardTable'
import BarChartDashboard from 'src/views/dashboards/BarChartDashboard'

function Dashboard() {
  const campains = useGetCampaigns_summaryQuery()
  const overviews = useGetOverViewsQuery()
  let campainsData = !campains.isLoading ? campains.data?.campaigns : []
  let overviewsData = !overviews.isLoading ? overviews.data : []

  return (
    <>
      <Grid container sx={{ my: [0, 4, 1.625] }} spacing={5}>
        <Grid item xs={12} sx={{ mb: [3, 0] }}>
          <GrapDashboards dataGrap={overviewsData} />
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
      <DashboardTable rows={campainsData} isLoading={campains.isLoading} />
    </>
  )
}

Dashboard.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default Dashboard
