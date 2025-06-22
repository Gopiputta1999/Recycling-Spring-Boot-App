import React from 'react';
import "../css/Ideas.css";
import { Typography, Card, CardContent, Container } from '@mui/material';

const ideasData = [
  {
    title: "Advanced Sorting Technologies",
    details: [
      "AI and Robotics: Use artificial intelligence and robotics in recycling facilities to better sort different types of plastics. AI can quickly recognize and separate various plastics based on their type, color, and condition, improving the accuracy of sorting.",
      "Near-Infrared (NIR) Spectroscopy: This technology helps identify plastic types by their chemical composition, which is helpful for separating recyclable plastics from those that are not."
    ],
  },
  {
    title: "Chemical Recycling",
    details: [
      "Breaking Down Plastic to Monomers: Chemical recycling allows plastics to be broken down into their base chemicals or monomers, which can then be used to create new plastics. This process can handle plastics that are harder to recycle mechanically, such as multi-layer packaging.",
      "Developing New Processes: Research into chemical processes that have lower environmental impact and are economically viable can help recycle more types of plastic effectively."
    ],
  },
  {
    title: "Biodegradable and Compostable Plastics",
    details: [
      "Investing in Biodegradable Alternatives: While not strictly 'recycling,' switching to biodegradable or compostable plastics where possible reduces the plastic waste that needs recycling.",
      "Standards for Decomposition: Setting standards for how quickly biodegradable plastics should break down in different environments (land, water) can help manage disposal and recycling effectively."
    ],
  },
  // Add other ideas here...
];

const Ideas = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Ideas for Improving Plastic Recycling
      </Typography>
      {ideasData.map((idea, index) => (
        <Card key={index} variant="outlined" style={{ marginBottom: '15px' }}>
          <CardContent>
            <Typography variant="h5" color="primary">
              {idea.title}
            </Typography>
            <ul>
              {idea.details.map((detail, idx) => (
                <li key={idx}>
                  <Typography variant="body1" style={{ marginBottom: '5px' }}>
                    {detail}
                  </Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Ideas;
