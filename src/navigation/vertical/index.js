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
      badgeColor: 'error',
      children: [
        {
          title: 'Template',
          action: 'read',
          subject: 'guest-page',
          path: '/template'
        },
        {
          title: 'Email Template',
          path: '/email_templeate'
        },
        {
          title: 'Landing Page',
          path: '/landingpage'
        },
        {
          title: 'User & Groups',
          path: '/user_group',
          action: 'read',
          subject: 'guest-page'
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
      path: '/accountsetting/account',
      action: 'read',
      subject: 'guest-page'
    },
    {
      title: 'User Management',
      icon: 'mdi:accounts-group',
      path: '/user_management'
    }
  ]
}

export default navigation
