import React from 'react'
import Hero from '../../../Components/Global/Hero/Hero'
import CourseMarketplace from '../../../Components/Global/Course/CourseMarketPlace'
import WhyChooseSection from '../../../Components/Global/Institute/WhySection'
import OfflineBatches from '../../../Components/Management/Batch/OfflineBatches'
import ActiveBatches from '../../../Components/Management/Batch/ActiveBatches'
import AssessmentSection from '../../../Components/Global/Assessment/Assessment'
import StudentJourney from '../../../Components/Global/Institute/StudentJourney'
import TeacherStrip from '../../../Components/Global/Faculty/TeacherStrip'
import TopPerformers from '../../../Components/Global/Institute/TopPerformers'
import KRJPlatform from '../../../Components/Global/Institute/KRJPlatform'
 
const Gateway = () => {
  return (
    <div>
      
      <Hero/>
      <CourseMarketplace/>
      <OfflineBatches/>
      <ActiveBatches/>
      <AssessmentSection/>
      <WhyChooseSection/>
      <StudentJourney/>
      <TeacherStrip/>
      <TopPerformers/>
      <KRJPlatform/>
      
    </div>
  )
}

export default Gateway
