import React from 'react';
import StaticPage from '../components/StaticPage';

const Privacy: React.FC = () => {
    return (
        <StaticPage title="Privacy Policy" subtitle="Last Updated: November 22, 2024">
            <h3>1. Introduction</h3>
            <p>
                Estately respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
            <h3>2. Data We Collect</h3>
            <p>
                We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul>
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
            </ul>
            <h3>3. How We Use Your Data</h3>
            <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul>
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
            <h3>4. Data Security</h3>
            <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>
        </StaticPage>
    );
};

export default Privacy;
