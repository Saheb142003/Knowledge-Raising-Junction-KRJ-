import React from 'react'
import AboutHero from '../../../Components/Global/About/AboutHero'
import PlatformExplanation from '../../../Components/Global/About/PlatfromExplaination'
import ValuePillars from '../../../Components/Global/About/ValuePillars'
import ScaleReach from '../../../Components/Global/About/ScaleReach'
import LearningPhilosophy from '../../../Components/Global/About/LearningPhilosophy'
import LeadershipSection from '../../../Components/Global/About/LeadershipSection'
import TargetAudience from '../../../Components/Global/About/TargetAudience'
import TrustSection from '../../../Components/Global/About/TrustSection'
import CTASection from '../../../Components/Global/About/CTASection'

 
const About = () => {
  return (
    <div>
      <AboutHero/>
      <PlatformExplanation/>
      <ValuePillars/>
      <ScaleReach/>
      <LearningPhilosophy/>
      <LeadershipSection/>
      <TargetAudience/>
      <TrustSection/>
      <CTASection/>
      
    </div>
  )
}

export default About
