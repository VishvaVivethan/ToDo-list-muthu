import React, { useEffect } from 'react';

const VerifyEmailButton = () => {
    useEffect(() => {
        // Load the external script for email verification
        const script = document.createElement('script');
        script.src = "https://www.phone.email/verify_email_v1.js";
        script.async = true;
        document.querySelector('.pe_verify_email').appendChild(script);

        // Define the receiver function
        window.phoneEmailReceiver = function(userObj) {
            const user_json_url = userObj.user_json_url;

            // Alert with the JSON URL
            alert(`Email Verification Successful !!\nPlease fetch authenticated email id from the following JSON file URL:\n ${user_json_url}`);
        };

        return () => {
     
            <div className='body'>

            </div>
        };
    }, []);

    return (
        <div className="pe_verify_email" data-client-id="15104960567026272280"></div>
    );
};

export default VerifyEmailButton;
