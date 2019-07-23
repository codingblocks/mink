import React from 'react'
import './Member.css'

// TODO: Ugly!
export default ({ member }) => {
    const m = member
    if (m) {
        return (<React.Fragment>
            Member Id: <span className="member-property">{m.memberId}</span><br />
            Member Assignment: <span className="member-property">{m.memberAssignment}</span><br />
            Member Metadata: <span className="member-property">{m.memberMetadata}</span><br />
            Client Id: <span className="member-property">{m.clientId}</span><br />
            Client Host: <span className="member-property">{m.clientHost}</span><br />
        </React.Fragment>)
    } else {
        return <React.Fragment>(None)</React.Fragment>
    }
}
