// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Tabs Imports

import TabConnections from 'src/views/pages/account-settings/TabConnections'
import TabAccount from './TabAccount'
import TabUi from './TabUi'
import TabReporting from './TabReporting'

const TabList = styled(MuiTabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  }
}))

const Setting = ({ tab, apiPricingPlanData }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)
  const [isLoading, setIsLoading] = useState(false)

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery(theme => theme.breakpoints.down('md'))

  const handleChange = (event, value) => {
    setIsLoading(true)
    router.push(`/accountsetting/${value.toLowerCase()}`).then(() => setIsLoading(false))
  }
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList = {
    account: <TabAccount />,
    ui: <TabUi />,
    reporting: <TabReporting />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TabContext value={activeTab}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TabList
                variant='scrollable'
                scrollButtons='auto'
                onChange={handleChange}
                aria-label='customized tabs example'
              >
                <Tab
                  value='account'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:account-outline' />
                      {!hideText && 'Account Settings'}
                    </Box>
                  }
                />
                <Tab
                  value='ui'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='bi:ui-radios' />
                      {!hideText && 'UI Settings'}
                    </Box>
                  }
                />
                <Tab
                  value='reporting'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon icon='mdi:report-box-outline' />
                      {!hideText && 'Reporting Settings'}
                    </Box>
                  }
                />
              </TabList>
            </Grid>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
              {isLoading ? (
                <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box>
              ) : (
                <TabPanel sx={{ p: 0 }} value={activeTab}>
                  {tabContentList[activeTab]}
                </TabPanel>
              )}
            </Grid>
          </Grid>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default Setting
