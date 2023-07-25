import React from "react";

function Dashboard() {
	return (
		<>
			<h1>Hello World</h1>
		</>
	)
}

Dashboard.acl = {
	action: 'read',
	subject: 'dashboard-page'
}

export default Dashboard;