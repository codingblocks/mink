import React, { useEffect, useState } from 'react'
import Group from './Group'

export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/kafkagroups')
      response.json()
        .then(r => {
          setData(r)
        })
    }
    fetchData()
  }, []);

  return (
    <>
    <p hidden={data.length}>Loading</p>
      <table hidden={!data.length} className='table table-hover table-sm mt-2' >
      <thead>
        <tr>
          <th scope='col'>Group</th>
          <th scope='col'>BrokerId</th>
          <th scope='col'>Broker Host</th>
          <th scope='col'>Protocol</th>
          <th scope='col'>State</th>
          <th scope='col'>Members</th>
        </tr>
      </thead>
      <tbody>
        {data.map(g => <Group key={g.group} group={g} />)}
      </tbody>
      </table>
    </>)
}