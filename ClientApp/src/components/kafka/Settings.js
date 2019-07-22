import React, { useState } from 'react'
import Modal from '../Modal'
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default ({ showSettings, onHide }) => {
  let existingName = window.localStorage.getItem('kafka:configName')
  let existingProperties = window.localStorage.getItem('kafka:properties')

  const [configName, setConfigName] = useState(existingName || '')
  const [properties, setProperties] = useState(existingProperties || '')

  const saveSettings = () => {
    window.localStorage.setItem('kafka:configName', configName)
    window.localStorage.setItem('kafka:properties', properties)
    fetch(`/api/kafkaconfigproperties/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        configName,
        properties
      })
    })
      .then(r => r.json())
      .then(r => {
        debugger
        console.log(r)
        onHide()
      })
  }
  const handleChange = (event) => {
    event.persist()
    if (event.target.name === 'configName') {
      setConfigName(event.target.value);
    }
    if (event.target.name === 'properties') {
      setProperties(event.target.value);
    }
  };
  const cancelSettings = () => onHide()

  return (
    <>
      <Modal show={showSettings} title="Kafka Settings" onSave={saveSettings.bind(this)} onCancel={cancelSettings}>
        <Form>
          <FormGroup>
            <Label for="configName">Kafka Client Configuration</Label>
            <Input name="configName" placeholder="Something memorable" className="form-control rounded-0" value={configName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="properties">Kafka Client Configuration</Label>
            <textarea name="properties" rows="10" placeholder="Just paste the whole config in here, we'll figure it out." className="form-control rounded-0" value={properties} onChange={handleChange} />
          </FormGroup>
        </Form>
      </Modal>
    </>
  )
}
