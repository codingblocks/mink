import React, { useState } from 'react'
import useInterval from '@use-it/interval'
import styled from 'styled-components'
import Logs from './Logs'

const containerStatusRefreshMs = 5000 // TODO Constant

const Checkbox = styled.input`
  vertical-align: middle;
`

export default () => {
  const [checked, setChecked] = useState({})

  const cloneChecks = () => JSON.parse(JSON.stringify(checked))

  const check = e => {
    const nextChecks = cloneChecks()
    nextChecks[e.target.value] = e.target.checked
    setChecked(nextChecks)
  }

  const toggleAll = e => {
    const nextChecks = cloneChecks()
    const nextValue = e.target.checked
    data.data.forEach(c => (nextChecks[c.Id] = nextValue))
    // TODO warning
    setChecked(nextChecks)
  }

  const [data, setData] = useState({
    data: [],
    errorMessage: null,
    status: 'loading'
  })

  const pruneRemovedContainers = () => {
    // go through data.data, remove any
    const nextChecks = cloneChecks()
    const removeList = Object.keys(nextChecks).filter(
      c => !data.data.find(d => (d.Id = c))
    )

    if (removeList.length) {
      removeList.forEach(c => delete nextChecks[c])
      setChecked(nextChecks)
    }
  }

  const restartContainers = () => {
    actionSelectedContainers('restart', 'DELETE')
  }

  const stopContainers = () => {
    actionSelectedContainers('stop', 'DELETE')
  }

  const actionSelectedContainers = (verb, method) => {
    const selected = Object.keys(checked).filter(id => checked[id])
    if (!selected.length) {
      alert('Please select at least one container')
      return
    }
    if (
      window.confirm(
        `Are you sure you want to ${verb} ${selected.length} container${
          selected.length > 1 ? 's' : ''
        }?`
      )
    ) {
      fetch(`/api/docker/${verb}/${selected.join(',')}`, {
        method: method
      })
    }
  }

  const refresh = () => {
    fetch('/api/docker/containers')
      .then(response => response.json())
      .then(data => {
        setData({
          data: data,
          errorMessage: null,
          status: 'success'
        })
        pruneRemovedContainers()
      })
      .catch(e => {
        setData({
          data: [],
          errorMessage: `Error: ${e.message}, are you sure Docker is running?`,
          status: 'failed'
        })
      })
  }

  const [commands, setCommands] = useState([])
  const viewLogs = (containerId, containerName) => {
    // TODO only if it's not in there already
    setCommands(
      commands.concat([
        {
          containerId,
          title: `${containerName} logs`,
          method: `Logs`
        }
      ])
    )
  }

  useInterval(refresh, containerStatusRefreshMs)

  return (
    <>
      <div
        className='alert alert-danger'
        role='alert'
        hidden={data.status !== 'failed'}
      >
        {data.errorMessage}
      </div>
      <div hidden={data.status !== 'loading'}>Loading...</div>
      <div hidden={data.status !== 'success'}>
        <div data-toggle='buttons'>
          <button className='btn btn-light"' onClick={restartContainers}>
            <span role='img' aria-label='Restart containers'>
              🔄
            </span>{' '}
            Restart containers
          </button>
          <button className='btn btn-light" mx-2' onClick={stopContainers}>
            <span role='img' aria-label='Stop containers'>
              🛑
            </span>{' '}
            Stop containers
          </button>
        </div>
        <table className='table table-hover table-sm mt-2'>
          <thead>
            <tr>
              <th scope='col'>
                <Checkbox type='checkbox' onClick={toggleAll} />
              </th>
              <th scope='col'>Name</th>
              <th scope='col'>Ports</th>
              <th scope='col'>State</th>
              <th scope='col'>Status</th>
              <th scope='col'>Logs</th>
              <th scope='col'>Attach</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map(c => (
              <tr key={c.Id}>
                <td>
                  <Checkbox
                    type='checkbox'
                    checked={checked[c.Id]}
                    onClick={e => check(e)}
                    value={c.Id}
                  />
                </td>
                <td>{c.Names[0]}</td>
                <td>
                  {c.Ports.filter(p => p.PublicPort)
                    .map(p => `${p.PrivatePort}->${p.PublicPort}`)
                    .sort()
                    .join(', ')}
                </td>
                <td>{c.State}</td>
                <td>{c.Status}</td>
                <td>
                  <button
                    onClick={() => viewLogs(c.Id, c.Names[0])}
                    title='View logs'
                  >
                    <span role='img' aria-label='View logs'>
                      🔎
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => window.alert('Not done yet!')}
                    title='View logs'
                  >
                    <span role='img' aria-label='Attach'>
                      🏃
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 hidden={!commands.length}>Logs</h2>
        <Logs commands={commands} />
      </div>
    </>
  )
}
