import React, { useEffect, useState } from 'react'
import GrapDashboards from 'src/views/dashboards/GrapDashboards'
import GrapDashboardsAction from 'src/views/dashboards/GrapDashboardsAction'
import LineChartDashboard from 'src/views/dashboards/LineChartDashboard'

import Typography from '@mui/material/Typography'

// MUI
import Grid from '@mui/material/Grid'

// Redux API
import { useGetCampaignGraphQuery, useGetCampaigns_summaryQuery } from 'src/store/api'
import { useGetOverViewsQuery } from 'src/store/api'

import DashboardTable from 'src/views/table/DashboardTable'
import BarChartDashboard from 'src/views/dashboards/BarchartDashboard'
import GrapTotalDashboards from 'src/views/dashboards/GrapTotalDashboard'

function Dashboard() {
  const [data, setDate] = useState({})
  const [graph, setGraph] = useState([])
  const campains = useGetCampaigns_summaryQuery()
  const overviews = useGetOverViewsQuery()
  const graphs = useGetCampaignGraphQuery()
  let campainsData = !campains.isLoading ? campains.data?.campaigns : []
  let overviewsData = !overviews.isLoading ? overviews.data : []
  let graphsData = !graphs.isLoading ? graphs.data : []

  return (
    <>
      <Grid key='Graph' container sx={{ my: [0, 4, 1.625] }} spacing={5}>
        <Grid key='GrapDashboards' item xs={12} sm={4} sx={{ mb: [3, 0] }}>
          <GrapDashboards dataGrap={overviewsData} />
        </Grid>
        <Grid key='GrapDashboardsAction' item xs={12} sm={8} sx={{ mb: [3, 0] }}>
          <GrapDashboardsAction dataGrap={overviewsData} />
        </Grid>
        <Grid key='GrapTotalDashboards' item sm={12} sx={{ mb: [3, 0] }}>
          <GrapTotalDashboards dataGrap={overviewsData} />
        </Grid>
        <Grid key='LineChartDashboard' item xs={12} sx={{ mb: [3, 0] }}>
          <LineChartDashboard dataGrap={graphsData} isLoading={graphs.isLoading} />
        </Grid>
        <Grid key='BarChartDashboard' item xs={12} sx={{ mb: [3, 0] }}>
          <BarChartDashboard dataGrap={graphsData} isLoading={graphs.isLoading} />
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
