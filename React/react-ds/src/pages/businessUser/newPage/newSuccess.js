import React from 'react'
import SubmitSuccessPage from '../../../components/resultPage/submitSuccessPage'
import StepProgress, { stepProgress } from '../../../components/resultPage/stepProgress'
export default class NewSuccess extends React.Component {

  render () {

    var successItems = {

      successTitle: "Idea submit Success - RaiseIdea",
      subTitle: "Idea request number:2020182818828182881 server configuration takes 1-5 minutes, please wait.",
      homeButtonName: "Return Home",
      gotoButtonName: "Raise New Idea",
      homeRul: "/EUC",
      GotoUrl: "/EUC/NewAutomation/Raiseidea"
    }


    var stepItems = [

      { title: "Raise Idea", description: "" },
      { title: "Prioritize", description: "" },
      { title: "Pick up Idea", description: "" },
      { title: "Initial Risk Assessment", description: "" },
      { title: "Build & Test", description: "" },
      { title: "UAT", description: "" },
      { title: "Final Risk Assessment", description: "" },
      { title: "Go-live", description: "" },
      { title: "Release", description: "" }
    ]
    return (
      <div width='60%'>
        <SubmitSuccessPage successItems={successItems} />
        <div><br /><br /></div>
        <div><br /><br /></div>
        <StepProgress stepNo='2' stepItems={stepItems} />
      </div>
    )
  }
}