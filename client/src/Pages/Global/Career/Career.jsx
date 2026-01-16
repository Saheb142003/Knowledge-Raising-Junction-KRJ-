import React from 'react'
import CareerHero from '../../../Components/Global/Career/CareerHero'
import ChoosePath from '../../../Components/Global/Others/ChoosePath'
import TeachingJobs from '../../../Components/Global/Career/TeachingJobs'
import WhyTeachAtKRJ from '../../../Components/Global/Institute/WhyTeachAtKRJ'
import StudentInquiry from '../../../Components/Global/Student/StudentInquiry'
import ApplicationProcess from '../../../Components/Global/Others/ApplicationProcess'
import AdminTrust from '../../../Components/Global/Admin/AdminTrust'
import CareerContactCTA from '../../../Components/Global/Career/CareerContactCTA'

const Career = () => {
  return (
    <div>
        <CareerHero/>
        <ChoosePath/>
        <TeachingJobs/>
        <WhyTeachAtKRJ/>
        <StudentInquiry/>
        <ApplicationProcess/>
        <AdminTrust/>
        <CareerContactCTA/>
      
    </div>
  )
}

export default Career
