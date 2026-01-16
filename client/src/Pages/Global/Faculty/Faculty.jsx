import React from 'react'
import FacultyHero from '../../../Components/Global/Faculty/FacultyHero'
import FacultyDifference from '../../../Components/Global/Faculty/FacultyDifference'
import TeachingMethodology from '../../../Components/Global/Faculty/TeachingMethodology'
import FacultyGrid from '../../../Components/Global/Faculty/facultyGrid'
import FacultyCourseMap from '../../../Components/Global/Faculty/FacultyCourseMap'
import FacultyStandards from '../../../Components/Global/Faculty/FacultyStandards'
import TeacherTraining from '../../../Components/Global/Faculty/TeacherTraining'
import FacultyTrust from '../../../Components/Global/Faculty/FacultyTrust'
import FacultyCTA from '../../../Components/Global/Faculty/FacultyCTA'

const Faculty = () => {
  return (
    <div>
      <FacultyHero/>
      <FacultyDifference/>
      <TeachingMethodology/>
      <FacultyGrid/>
      <FacultyCourseMap/>
      <FacultyStandards/>
      <TeacherTraining/>
      <FacultyTrust/>
      <FacultyCTA/>
    </div>
  )
}

export default Faculty
