import React from 'react'
import ReactDOM from 'react-dom/client'
import { ElectronicsBoxModel } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ElectronicsBoxModel
      isEditing={false}
      dispatch={() => { }}
      resources={{}}
      firmwareHardware={"arduino"}
      bot={{
        hardware: {
          informational_settings: {
            locked: false,
            sync_status: "synced",
          }
        }
      }}
      botOnline={true} />
  </React.StrictMode>,
)
