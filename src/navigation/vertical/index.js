const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: 'mdi:home',
      action: 'read',
      subject: 'guest-page',
      path: '/dashboards'
    },
    {
      title: 'Campaigns',
      icon: 'mdi:megaphone',
      action: 'read',
      subject: 'guest-page',
      path: '/campaigns'
    },
    {
      title: 'Phishing Material',
      icon: 'mdi:email',
      action: 'read',
      subject: 'guest-page',
      icon: 'mdi:shield-outline',
      badgeColor: 'error',
      children: [
        {
          title: 'Email Template',
          subject: 'guest-page',
          icon: 'mdi:shield-outline',
          path: '/email_templeate'
        },
        {
          title: 'Landing Page',
          subject: 'acl-page',
          icon: 'mdi:shield-outline',
          path: '/landingpage'
        },
        {
          title: 'User & Groups',
          path: '/user_group'
        }
      ]
    },

    {
      title: 'Sending Profile',
      action: 'read',
      subject: 'guest-page',
      icon: 'mdi:cube-send',
      path: '/send_profile'
    },
    {
      title: 'Account Settings',
      icon: 'mdi:account-badge-outline',
      path: '/accountsetting/account'
    },
    {
      title: 'User Management',
      icon: 'mdi:accounts-group',
      path: '/user_management'
    }
  ]
}

export default navigation
