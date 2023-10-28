import NextLink from 'next/navigation'
import { useRouter } from 'next/router'
import { Button, Grid, Typography } from '@mui/material'

import { useGetCampaignQuery } from 'src/store/api'
import { useGetCampaign_summary_resultQuery } from 'src/store/api'
import { useGetCampaign_resultQuery } from 'src/store/api'

// Import Component
import UserGroupDetailTable from 'src/views/table/UserGroupDetailTable'
import GrapDashboards from 'src/views/dashboards/GrapDashboards'
import GrapDashboardsAction from 'src/views/dashboards/GrapDashboardsAction'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const UserGroupDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const campain = useGetCampaignQuery(id)
  const summary = useGetCampaign_summary_resultQuery(id)
  const result = useGetCampaign_resultQuery(id)

  let campainsData = !campain.isLoading ? campain.data : []
  let summaryData = !summary.isLoading ? summary.data?.stats : []
  let resultData = !result.isLoading ? result.data?.results : []

  return (
    <>
      <Typography variant='h3' sx={{ my: 8 }}>
        Results for {campainsData?.name}
      </Typography>
      <Button
        variant='contained'
        sx={{ my: 2, mr: 2 }}
        component={NextLink}
        href='/dashboards'
        startIcon={<ArrowBackIcon fontSize='large' />}
      >
        Back
      </Button>
      <Button variant='contained' sx={{ my: 2 }} color='primary' disabled>
        {campainsData.status ?? 'Wating...'}
      </Button>
      <Grid container sx={{ my: [0, 4, 1.625] }} spacing={5}>
        <Grid item xs={12} sm={4} sx={{ mb: [3, 0] }}>
          <GrapDashboards dataGrap={summaryData} />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ mb: [3, 0] }}>
          <GrapDashboardsAction dataGrap={summaryData} />
        </Grid>
      </Grid>
      <Typography variant='h3' sx={{ my: 8 }}>
        Details
      </Typography>
      <UserGroupDetailTable data={resultData} isLoading={result.isLoading} pageID={id} />
    </>
  )
}

UserGroupDetail.acl = {
  action: 'read',
  subject: 'guest-page'
}

export default UserGroupDetail
