import React from 'react'

export default ({ member }) => {
  const m = member
  if (m) {
    return (<ul>
      <li>Member Id: {m.memberId}</li>
      <li>Member Assignment: {m.memberAssignment}</li>
      <li>Member Metadata: {m.memberMetadata}</li>
      <li>Client Id: {m.clientId}</li>
      <li>Client Host: {m.clientHost}</li>
    </ul>)
  } else {
    return <>(None)</>
  }
}
