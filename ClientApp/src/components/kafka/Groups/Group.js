import React from 'react'
import Member from './Member'

export default ({ group }) => {
  const g = group

  return (<tr>
    <td>{g.group}</td>
    <td>{g.broker.brokerId}</td>
    <td>{g.broker.host}:{g.broker.port}</td>
    <td>{g.protocolType} {g.protocol}</td>
    <td>{g.state}</td>
    <td>Members: {g.members.map(m => <Member key={m.memberId} member={m} />)}</td>
  </tr>)
}