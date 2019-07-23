import React, {useState} from 'react'
import Modal from '../../Modal'
import Member from './Member'

export default ({ group }) => {
    const g = group
    const [showMemberModal, setShowMemberModal] = useState(false);
    const showMembers = (e) => {
        e.preventDefault()
        setShowMemberModal(true)
    }
    const hideMembers = () => setShowMemberModal(false)

    return (<tr>
        <td>{g.group}</td>
        <td>{g.broker.brokerId}</td>
        <td>{g.broker.host}:{g.broker.port}</td>
        <td>{g.protocolType} {g.protocol}</td>
        <td>{g.state}</td>
        <td>
            <span hidden={g.members.length}>{g.members.length}</span>
            <a hidden={!g.members.length} onClick={showMembers} href={`#${g.group}`}>{g.members.length}</a>
            <Modal title={`${g.group} Members`} show={showMemberModal} onCancel={hideMembers}>
                {g.members.map(m => <Member key={m.memberId} member={m} />)}
            </Modal>
        </td>
    </tr>)
}