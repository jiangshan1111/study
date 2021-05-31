import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
// import './result.css'
import { Result, Button } from 'antd'

export const submitSuccess = props => {

  //const ideaType =  'Idea submit Success'

  const { successItems } = props

  let ideaType = successItems['successTitle']
  let strSubTitle = successItems['subTitle']
  //let ideaType1 = ideaType + this.props
  return (
    <div>

      <Result
        status="success"
        title={ideaType}
        subTitle={strSubTitle}
        extra={[
          <Button type="primary" key="returnHome"
            onClick={() => {
              window.location.href = successItems['homeRul']
            }}
          >
            {successItems['homeButtonName']}
          </Button>,
          <Button key="NewIdea"
            onClick={() => {
              window.location.href = successItems['GotoUrl']
            }}

          >
            {successItems['gotoButtonName']} </Button>,
        ]}
      />

    </div>

  )
}
export default submitSuccess