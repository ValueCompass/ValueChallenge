CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "bar inline",
            position: "top",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        functionality: {}
    },
    language: {
        default: "en",
        autoDetect: "en",
        translations: {
            en: {
                consentModal: {
                    //title: "Hello traveller, it's cookie time!",
                    description: "We use optional cookies to improve your experience on our site, including social media integration and personalized advertising based on your online activity. If you reject optional cookies, only those strictly necessary for the provision of our services will be used. You can update your choices by clicking \"Manage Cookies\" at the bottom of the page.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    showPreferencesBtn: "Manage Cookie",
                    //footer: "<a href=\"#link\">Privacy Policy</a>\n<a href=\"#link\">Terms and conditions</a>"
                },
                preferencesModal: {
                    title: "Consent Preferences Center",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close modal",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "Manage Cookie Preferences",
                            description: "The majority of our websites utilize cookies. Cookies are small text files stored on your device to retain data for later retrieval by a web server. We, along with our third-party partners, employ cookies to recall your preferences and settings, facilitate login functionality, deliver personalized advertisements, and analyze the performance of our websites."
                        },
                        {
                            title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                            description: "We utilize essential cookies to carry out critical website functions. These include enabling login functionality, preserving your language preferences, delivering a shopping cart experience, enhancing performance, routing traffic across web servers, detecting screen dimensions, measuring page load times, improving user experience, and gathering audience analytics. Such cookies are indispensable for the proper functioning of our website.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Social Media",
                            description: "We and third parties use social media cookies to display ads and content to you based on your social media profile and your activity on our website. These cookies connect your activity on our site with your social media profile, so that the ads and content you see on our website and across social media platforms are better aligned with your interests.",
                            linkedCategory: "functionality"
                        }
                    ]
                }
            }
        }
    }
});