import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default (props) => {
    const { show, title, onSave, onCancel, children } = props
    if (!show) {
        return null;
    }

    return (
        <div>
            <Modal isOpen={true}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <div>{children}</div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={onCancel}>Cancel</Button>
                    <Button color="primary" onClick={onSave} hidden={!onSave}>Save</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}