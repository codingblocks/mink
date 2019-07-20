import React from 'react'
import Terminal from './Terminal'

export default ({ commands, onCloseCommand }) => {
  const selectedIndex = commands.length - 1
  return (
    <>
      <ul className='nav nav-tabs' role='tablist'>
        {commands.map((t, index) => (
          <li className='nav-item' key={t.containerId}>
            <a
              className={
                index === selectedIndex ? 'nav-link active' : 'nav-link'
              }
              id={`tab-logs-${t.containerId}`}
              data-toggle='tab'
              href={`#logs-${t.containerId}`}
              role='tab'
              aria-controls={`logs-${t.containerId}`}
              aria-selected={index === selectedIndex}
            >
              {t.title}
              <button
                className='mx-2'
                onClick={() => onCloseCommand(t.method, t.containerId)}
              >
                <span role='img' aria-label='Close terminal'>
                  ❌
                </span>
              </button>
            </a>
          </li>
        ))}
      </ul>
      <div className='tab-content'>
        {commands.map((t, index) => (
          <div
            key={t.containerId}
            className={
              index === selectedIndex
                ? `tab-pane fade show active`
                : `tab-pane fade`
            }
            id={`logs-${t.containerId}`}
            role='tabpanel'
            aria-labelledby={`tab-logs-${t.containerId}`}
          >
            <Terminal method={t.method} id={t.containerId} />
          </div>
        ))}
      </div>
    </>
  )
}
