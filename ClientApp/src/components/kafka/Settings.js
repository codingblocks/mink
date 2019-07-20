import React, { useState } from 'react'
import Modal from '../Modal'
import { Form, FormGroup, Label } from 'reactstrap';

export default ({ showSettings, onHide }) => {
  const storageKey = 'kafkaConfig'

  let existingValue = window.localStorage.getItem(storageKey)

  const [kafkaConfig, setKafkaConfig] = useState(existingValue || '')

  const saveSettings = () => {
    // store in local cache
    debugger
    window.localStorage.setItem(storageKey, kafkaConfig)
    onHide()
  }
  const handleChange = (event) => {
    event.persist()
    setKafkaConfig(event.target.value);
  };
  const cancelSettings = () => onHide()

  return (
    <>
      <Modal show={showSettings} title="Kafka Settings" onSave={saveSettings.bind(this)} onCancel={cancelSettings}>
        <Form>
          <FormGroup>
            <Label for="kafkaconfig">Kafka Client Configuration</Label>
            <textarea name="kafkaConfig" rows="10" placeholder="Just paste the whole config in here!" className="form-control rounded-0" value={kafkaConfig} onChange={handleChange} />
          </FormGroup>
        </Form>
      </Modal>
    </>
  )
}
