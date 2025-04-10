import { Book } from 'components/landing/Home/Book'
import Chatbot from 'components/landing/Home/Chatbot'
import Hero from 'components/landing/Home/Hero'
import SmartDashboard from 'components/landing/Home/SmartDashboard'
import React from 'react'

export const Home = () => {
  return (
    <div>
      <Hero/>
      <SmartDashboard/>
      <Book/>
      <Chatbot/>
    </div>
  )
}
