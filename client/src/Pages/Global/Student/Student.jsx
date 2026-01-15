import React from 'react'
import KRJEdge from '../../../Components/Global/Institute/KRJEdge'
import DisciplineSection from '../../../Components/Global/Institute/DisciplineSection'
import CentersReach from '../../../Components/Global/Institute/CentresReach'
import FacultyRatio from '../../../Components/Global/Institute/FacultyRatio'
import TeachingSystem from '../../../Components/Global/Institute/TeachingSystem'
import StudentFacilities from '../../../Components/Global/Infrastructure/Studentfacilities'
import OfflineQuality from '../../../Components/Global/Infrastructure/OfflineQuality'
import AffordableEducation from '../../../Components/Global/Others/AffordableEducation'
import LearningModes from '../../../Components/Global/Others/LearningModes'
import BeyondClassrooms from '../../../Components/Global/Others/BeyondClassrom'

const Student = () => {
  return (
    <div>
        <KRJEdge/>
        <DisciplineSection/>
        <CentersReach/>
        <FacultyRatio/>
        <TeachingSystem/>
        <StudentFacilities/>
        <OfflineQuality/>
        <BeyondClassrooms/>
        <AffordableEducation/>
        <LearningModes/>
      
    </div>
  )
}

export default Student
