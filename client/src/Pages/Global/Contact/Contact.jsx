import React from 'react'
import ContactHero from '../../../Components/Global/Contact/ContactHero'
import QuickContact from '../../../Components/Global/Contact/QuickContact'
import ContactRouting from '../../../Components/Global/Contact/ContactRouting'
import ContactForm from '../../../Components/Global/Contact/ContatForm'
import OfflineCenters from '../../../Components/Global/Institute/OfflineCentres'
import ContactProcess from '../../../Components/Global/Contact/ContactProcess'
import SupportAssurance from '../../../Components/Global/Contact/SupportAssurance'
import ContactFinalCTA from '../../../Components/Global/Contact/ContactFinalCTA'

const Contact = () => {
  return (
    <div>
        <ContactHero/>
        <QuickContact/>
        <ContactRouting/>
        <ContactForm/>
        <OfflineCenters/>
        <ContactProcess/>
        <SupportAssurance/>
        <ContactFinalCTA/>
      
    </div>
  )
}

export default Contact
