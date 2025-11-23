import React from 'react';
import StaticPage from '../components/StaticPage';

const About: React.FC = () => {
    return (
        <StaticPage title="About Us" subtitle="Reimagining Real Estate for the Modern World">
            <p>
                At Estately, we believe that finding your dream home should be an exciting journey, not a stressful chore. Founded in 2024, we set out to revolutionize the real estate industry by combining cutting-edge technology with a human-centric approach.
            </p>
            <h3>Our Mission</h3>
            <p>
                To empower everyone to find their perfect place in the world. Whether you're buying, selling, or renting, we provide the tools, data, and expertise you need to make confident decisions.
            </p>
            <h3>Our Values</h3>
            <ul>
                <li><strong>Transparency:</strong> We believe in open information and honest communication.</li>
                <li><strong>Innovation:</strong> We constantly push the boundaries of what's possible in real estate tech.</li>
                <li><strong>Community:</strong> We're not just building a platform; we're building neighborhoods.</li>
            </ul>
            <h3>The Team</h3>
            <p>
                We are a diverse team of engineers, designers, and real estate experts passionate about creating the best possible experience for our users.
            </p>
        </StaticPage>
    );
};

export default About;
