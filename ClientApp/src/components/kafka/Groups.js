import React, { useEffect, useState } from 'react'
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
      {data.map(g => <div key={g.group}>
        Group: {g.group}
        BrokerId: {g.broker.brokerId}<br />
        Protocol: {g.protocol}<br />
        Protocol Type: {g.protocolType}<br />
        State: {g.state}<br/>
        Broker: {g.broker.host}:{g.broker.port}<br />
        Message: ???
      </div>)}
  </>)
}