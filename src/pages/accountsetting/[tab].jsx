// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import Setting from 'src/views/pages/accountSetting/setting'

const AccountSettingsTab = ({ tab, apiPricingPlanData }) => {
  return <Setting tab={tab} apiPricingPlanData={apiPricingPlanData} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },
      { params: { tab: 'ui' } },
      { params: { tab: 'reporting' } }
     
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await axios.get('/pages/pricing')
  const data = res.data

  return {
    props: {
      tab: params?.tab,
      apiPricingPlanData: data.pricingPlans
    }
  }
}

export default AccountSettingsTab
