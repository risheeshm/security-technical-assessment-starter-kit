import React from 'react';
import StaticPage from '../components/StaticPage';

const Terms: React.FC = () => {
    return (
        <StaticPage title="Terms of Service" subtitle="Last Updated: November 22, 2024">
            <h3>1. Acceptance of Terms</h3>
            <p>
                By accessing and using the Estately website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            <h3>2. Use of Services</h3>
            <p>
                You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:
            </p>
            <ul>
                <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
                <li>To impersonate or attempt to impersonate Estately, an Estately employee, another user, or any other person or entity.</li>
            </ul>
            <h3>3. User Accounts</h3>
            <p>
                To access certain features of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <h3>4. Intellectual Property</h3>
            <p>
                The content, features, and functionality of our services are owned by Estately and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <h3>5. Termination</h3>
            <p>
                We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
        </StaticPage>
    );
};

export default Terms;
