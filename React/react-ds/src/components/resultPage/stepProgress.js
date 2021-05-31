import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './result.css';
import { Steps } from 'antd';

const { Step } = Steps;
export const stepProgress = props => {

  const { stepNo } = props
  const { stepItems } = props
  let nStep = stepNo
  var strSteplist = new Array(10)

  for (var i = 0; i < stepItems.length; i++) {

    strSteplist[i] = <Step title={stepItems[i]['title']} key={i} description={stepItems[i]['description']} />
  }

  return (

    <div>
      <Steps progressDot current={nStep}>
        {strSteplist}
        {/* <Step title={stepItems[0]['title']} description={stepItems[0]['description']} />
                <Step title="Prioritize" description="" />
                <Step title="Pick up Idea" description="" />
                <Step title="Initial Risk Assessment" description="" />
                <Step title="Build & Test" description="" />
                <Step title="Build & Test" description="" />
                <Step title="Final Risk Assessment" description="" />
                <Step title="Go-live" description="" />
                <Step title="Release" description="" /> */}
      </Steps>
    </div>

  )
}
export default stepProgress