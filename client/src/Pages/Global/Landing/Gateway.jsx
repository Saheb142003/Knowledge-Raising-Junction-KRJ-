import React from 'react'
import Header from '../../../Components/Global/Header/Header'
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
import Footer from '../../../Components/Global/Footer/Footer'
 
const Gateway = () => {
  return (
    <div>
      <Header/>
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
      <Footer/>
      
    </div>
  )
}

export default Gateway
