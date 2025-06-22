import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/AboutUs.css';

function About() {
  return (
    <div>
        <Header/>
        <div className="about-us">
      <h1 className="about-title">About Us</h1>
      
      <section className="about-section">
        <p>
         We are dedicated to making the world a cleaner, more sustainable place through the promotion and facilitation of plastic recycling. Founded with the belief that small actions can lead to big changes, we strive to reduce plastic waste, raise awareness, and empower individuals and communities to take action against the growing plastic pollution crisis.
        </p>
      </section>
      
      <section className="about-section">
        <h2 className="about-subtitle">Our Mission</h2>
        <p>
          Our mission is simple: to inspire, educate, and engage people in reducing plastic waste through recycling. We aim to make recycling easy, accessible, and impactful by providing the tools, resources, and knowledge necessary to turn plastic waste into valuable resources. By doing so, we hope to create a circular economy where plastics are reused and repurposed, rather than polluting our environment.
        </p>
      </section>
      
      <section className="about-section">
        <h2 className="about-subtitle">What We Do</h2>
        <ul className="about-list">
          <li>Educational Resources: Comprehensive guides on how to recycle various types of plastics and why it’s important.</li>
          <li>Community Engagement: Workshops, events, and clean-up drives to promote recycling and reduce plastic waste.</li>
          <li>Innovative Solutions: Collaborating with experts to find new ways to recycle and repurpose plastics.</li>
          <li>Recycling Centers Directory: Helping users find nearby recycling facilities for responsible waste management.</li>
        </ul>
      </section>
      
      <section className="about-section">
        <h2 className="about-subtitle">Why It Matters</h2>
        <p>
          Plastic waste is one of the most significant environmental challenges of our time. Millions of tons of plastic enter our ecosystems every year, harming wildlife and polluting our planet. At <strong>[Your Website Name]</strong>, we believe that recycling and reducing plastic use can help create a healthier planet for future generations.
        </p>
      </section>
      
      <section className="about-section">
        <h2 className="about-subtitle">Join Us in the Movement</h2>
        <p>
          We believe that together, we can make a difference. Whether you're looking to learn more about recycling, get involved in local clean-up events, or find ways to reduce plastic use, we’re here to help. Join us and help build a cleaner, greener, and more sustainable world.
        </p>
      </section>
    </div>
        <Footer/>
    </div>
  )
}

export default About