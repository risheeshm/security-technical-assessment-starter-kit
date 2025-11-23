import React from 'react';
import StaticPage from '../components/StaticPage';

const Cookies: React.FC = () => {
    return (
        <StaticPage title="Cookie Policy" subtitle="Last Updated: November 22, 2024">
            <h3>1. What Are Cookies?</h3>
            <p>
                Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
            <h3>2. How We Use Cookies</h3>
            <p>
                We use cookies for the following purposes:
            </p>
            <ul>
                <li><strong>Strictly Necessary Cookies:</strong> These are cookies that are required for the operation of our website.</li>
                <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
                <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website.</li>
            </ul>
            <h3>3. Managing Cookies</h3>
            <p>
                Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
            </p>
        </StaticPage>
    );
};

export default Cookies;
