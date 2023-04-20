import React, { useEffect, useState } from 'react'
// 
import '../STYLESHEETS/Webline.css'
import '../STYLESHEETS/HealthCalculator.css'
import Footer from './Footer'
import Navigation from './Navigation'
// 
// 

export default function Webline() {

    function closeNav() {
        document.querySelector(".navbody").style.width = "0";
    }

    const comps = [
        {
            id: 0,
            Name: "SEO",
            Desc: "SEO (Search Engine Optimization) helps websites by enhancing their visibility and ranking on search engine results pages, which can increase the probability of users clicking through to the site. This, in turn, can lead to more traffic, higher conversion rates, and improved business success.",
            Points: [
                "Keyword Usage: The website should be optimized for relevant keywords that are commonly used by users in search queries related to the website's content or purpose. This includes incorporating keywords in the website's title tags, headings, meta descriptions, URLs, and throughout the content in a natural and meaningful way.",
                "Content Quality: The website should have high-quality, original, and valuable content that provides relevant information to users. This includes well-written and organized content that is easy to read, informative, and engaging. Avoiding duplicate content, keyword stuffing, or low-quality content that may negatively impact the website's SEO.",
                "Site Structure: The website should have a clear and logical site structure that makes it easy for search engines to crawl and understand the website's content. This includes having a sitemap, using descriptive and meaningful URLs, and organizing content in a hierarchical structure using headings and subheadings.",
                "Meta Tags: The website should have optimized meta tags, including title tags and meta descriptions, that accurately and concisely describe the content of each page. These meta tags should include relevant keywords and be unique for each page to improve search engine rankings and click-through rates.",
                "Technical SEO: The website should have proper technical SEO elements in place, such as optimized robots.txt file, XML sitemap, clean URLs, responsive design for mobile devices, fast page load times, proper header tags usage, and use of canonical tags to avoid duplicate content issues."]
        },
        {
            id: 1,
            Name: "Design",
            Desc: "Design helps websites create visually appealing and engaging user experiences, which can increase user engagement, time spent on site, and ultimately, conversion rates. A well-designed website also conveys professionalism and credibility, helping to establish trust and loyalty with users.",
            Points: [
                "Navigation: A well-designed website should have clear and easy-to-use navigation. This includes a clearly labeled menu, a search bar, and logical grouping of content to ensure users can quickly find what they are looking for.",
                "Layout and Design: The layout and design of a website should be visually appealing, with a consistent design style throughout the site. This includes the use of appropriate color schemes, typography, images, and spacing to create a professional and cohesive look.",
                "Accessibility: A website should be accessible to all users, including those with disabilities. This means adhering to accessibility standards such as providing text alternatives for non-text content, ensuring keyboard accessibility, and designing with consideration for users with visual or hearing impairments.",
                "Mobile Responsiveness: With the increasing use of mobile devices for browsing the web, it is important that a website is designed with mobile responsiveness in mind. This means ensuring the website can adapt to different screen sizes and devices, and that the content is easily accessible on smaller screens.",
                "Performance: A well-designed website should load quickly and have minimal downtime. This requires optimizing images, minimizing code, and choosing a reliable hosting provider to ensure the website performs well for users."]
        },
        {
            id: 2,
            Name: "UX (User Experience)",
            Desc: "UX (User Experience) focuses on creating a positive and seamless experience for users, resulting in higher user satisfaction, engagement, and loyalty. Additionally, good UX design can minimize user frustration, improve site navigation, and increase the chances of users returning to the site in the future.",
            Points: [
                "User Flow: A website should have a clear and logical user flow, allowing users to navigate the site easily and find the information they need without confusion or frustration.",
                "Usability: The website should be easy to use, with intuitive controls and clear calls to action. This includes designing forms, buttons, and other interactive elements in a way that is easy to understand and use.",
                "Consistency: The website should be consistent in terms of design, layout, and functionality. This helps users to feel familiar and comfortable with the site, making it easier to navigate and find what they need.",
                "Feedback: The website should provide feedback to users as they interact with it. This can include visual cues, such as changing the color of a button when it is clicked, or providing helpful error messages when users encounter problems.",
                "Accessibility: The website should be accessible to all users, regardless of their abilities. This includes designing for users with visual, auditory, or motor impairments, as well as considering factors such as language and culture to ensure the website is usable by a wide range of people."]
        },
        {
            id: 3,
            Name: "Photos",
            Desc: "Photos can add value to websites by visually conveying information, telling stories, and eliciting emotions that may not be possible with text alone. Additionally, images can break up lengthy paragraphs of text, improve the website's aesthetic appeal, and enhance user engagement and duration of stay on the site.",
            Points: [
                "Relevance: Photos used on the website should be relevant to the content and purpose of the website. They should enhance the overall message and support the website's goals, whether it's conveying information, evoking emotions, or telling a story.",
                "Quality: The photos should be of high quality, with clear resolution, proper lighting, and minimal noise or distortion. Blurry or low-quality photos can negatively impact the website's aesthetics and user experience.",
                "Consistency: The photos used on the website should have a consistent style and tone, creating a cohesive visual experience. This includes considerations such as color grading, composition, and image size, to ensure a unified look and feel.",
                "Authenticity: The photos should feel genuine and authentic, reflecting the brand's identity and values. Avoiding stock photos that feel staged or generic can help create a more authentic and engaging user experience.",
                "Accessibility: Consideration should be given to accessibility standards when using photos on a website. This includes providing alternative text (alt text) for images to ensure they are accessible to users with visual impairments who may use screen readers."]
        }, {
            id: 4,
            Name: "Menu",
            Desc: "A website's menu plays a crucial role in providing users with a structured and coherent path to navigate through its pages, facilitating their search for specific information. Additionally, a well-crafted menu can significantly enhance the user experience by minimizing user confusion and frustration, making the site more accessible, and ultimately increasing the chances of users revisiting the website.",
            Points: [
                "Navigation: The website menu should be easy to navigate, with clear and intuitive labels that accurately describe the website's content or sections. This includes considering user expectations and behavior to ensure the menu is structured in a way that makes sense to users.",
                "Consistency: The menu should be consistent across all pages of the website, creating a sense of familiarity and reducing confusion for users. This includes keeping the same menu structure, design, and position throughout the website.",
                "Accessibility: The menu should be accessible to all users, including those with visual, auditory, or motor impairments. This includes using appropriate color contrasts, providing keyboard navigation options, and providing alternative text (alt text) for images used in the menu.",
                "Responsiveness: The menu should be designed to be responsive and adapt to different screen sizes and devices. This includes using a mobile-friendly design and ensuring that the menu is easily accessible and usable on mobile devices.",
                "Visibility: The menu should be prominently displayed and easy to find, helping users quickly and easily access the website's content or sections. This includes considering the use of menu placement, size, and color to ensure it stands out and catches the user's attention."]
        },
        {
            id: 5,
            Name: "Color Palette",
            Desc: "A color palette aids in establishing brand identity and visual style, making the website more memorable and recognizable to users. Additionally, a well-designed color palette can create a cohesive and harmonious visual experience, improving the overall aesthetics of the site and increasing user engagement.",
            Points: [
                "Consistency: A website's color palette should be consistent throughout the site, creating a unified and cohesive design.",
                "Contrast: The colors used should have sufficient contrast to ensure readability and accessibility for all users. Contrast is particularly important for text and interactive elements.",
                "Complementary Colors: The website's color palette should include complementary colors that work well together, creating a harmonious and visually appealing design.",
                "Branding: The website's color palette should reflect the brand's identity, including the use of brand colors and other relevant colors that reinforce the brand's message and personality.",
                "Emotion: The website's color palette should consider the emotions that different colors evoke and use them appropriately to create the desired tone and atmosphere. For example, blue may be used for a calming effect, while red may be used to convey energy or urgency."]
        },
        {
            id: 6,
            Name: "Functionality",
            Desc: "Functionality in websites ensures the website operates effectively and meets the needs of its users. When a website functions smoothly and with ease, it can enhance the user experience, increase user satisfaction, and ultimately lead to users returning to the website in the future.",
            Points: [
                "User Experience (UX): The website should be designed with a focus on user experience, ensuring that all functionality is intuitive, easy to use, and provides value to the user. This includes considering user behavior and expectations when designing and implementing website functionality.",
                "Speed: The website should be fast and responsive, with quick loading times and minimal lag or delay. This includes optimizing images and videos, minimizing HTTP requests, and using caching techniques to improve website speed.",
                "Compatibility: The website should be compatible with different browsers and devices, ensuring that all users can access and use the website regardless of their preferred browser or device. This includes considering differences in screen sizes, operating systems, and browser versions when designing and testing website functionality.",
                "Security: The website should be secure, with appropriate measures in place to protect user data and prevent unauthorized access. This includes using SSL encryption, implementing strong password policies, and regularly updating and maintaining the website's software and plugins.",
                "Accessibility: The website should be accessible to all users, including those with disabilities or impairments. This includes complying with accessibility guidelines, such as providing alternative text for images, using descriptive link text, and ensuring that all functionality is available through keyboard navigation."]
        },
        {
            id: 7,
            Name: "Originality",
            Desc: "Originality is relevant for websites as it enables them to stand out from the competition, creating a lasting impression on users. A unique website can establish brand identity, and enhance user engagement and time spent on the site.",
            Points: [
                "Design: The website should have a unique and distinctive design that stands out from competitors and reflects the brand's identity and values. This includes using a consistent design language, typography, color palette, and imagery that are unique to the website.",
                "Content: The website should have original and high-quality content that provides value to users and differentiates the website from competitors. This includes providing unique insights, perspectives, or solutions that are not found elsewhere.",
                "Functionality: The website should have unique and innovative functionality that sets it apart from competitors and provides additional value to users. This includes implementing new or different ways of interacting with content or providing unique features that are not found elsewhere.",
                "User Experience (UX): The website should provide a unique and memorable user experience that sets it apart from competitors and creates a lasting impression on users. This includes considering the user's journey throughout the website and implementing unique and innovative ways to engage and delight users.",
                "Branding: The website should reflect the brand's unique identity and personality, creating a consistent and memorable brand experience for users. This includes using unique branding elements, such as a distinct logo, tagline, or brand voice, that differentiate the website from competitors and reinforce the brand's values and messaging."]
        }
    ]
    const [compID, setCompID] = useState(-1)
    // 
    const scorePoints = [
        {
            id: 0,
            Comp: "SEO",
            Desc: "SEO (Search Engine Optimization) helps websites by enhancing their visibility and ranking on search engine results pages, which can increase the probability of users clicking through to the site. This, in turn, can lead to more traffic, higher conversion rates, and improved business success.",
            Points: [
                [1, "The website has poor search engine optimization (SEO) with missing meta tags, low-quality content, and lack of proper keyword usage."],
                [2, "Although some basic SEO elements are in place, such as meta tags and keyword usage, the website lacks proper optimization for search engines, resulting in low visibility in search results."],
                [3, "The website has decent SEO with relevant meta tags, optimized content, and moderate keyword usage, but there is room for improvement in terms of optimizing for search engines."],
                [4, "The website has good SEO practices in place, with optimized meta tags, high-quality content, and proper keyword usage, resulting in improved search engine rankings and visibility."],
                [5, "The website has excellent SEO, with thorough optimization of meta tags, high-quality content, proper keyword usage, and effective backlinking, resulting in top rankings in search engine results and high visibility to target audiences."]
            ]
        },
        {
            id: 1,
            Comp: "Design",
            Desc: "Design helps websites create visually appealing and engaging user experiences, which can increase user engagement, time spent on site, and ultimately, conversion rates. A well-designed website also conveys professionalism and credibility, helping to establish trust and loyalty with users.",
            Points: [
                [1, "The website lacks clear navigation and the layout is cluttered and confusing."],
                [2, "Although the website has clear navigation, the design is outdated and unappealing."],
                [3, "The website has a clean and modern design, but there are a few usability issues that need to be addressed."],
                [4, "The website has an excellent user interface, with intuitive navigation and visually appealing design."],
                [5, "The website is a masterclass in design, with a seamless user experience and stunning visual elements that enhance the brand's message."]
            ]
        },
        {
            id: 2,
            Comp: "UX",
            Desc: "UX (User Experience) focuses on creating a positive and seamless experience for users, resulting in higher user satisfaction, engagement, and loyalty. Additionally, good UX design can minimize user frustration, improve site navigation, and increase the chances of users returning to the site in the future.",
            Points: [
                [1, "The website has a poor user experience (UX) with confusing navigation, slow loading speed, and non-responsive design."],
                [2, "Although some basic UX elements are in place, such as clear navigation and responsive design, the website lacks advanced features to enhance user experience, resulting in an average user experience."],
                [3, "The website has decent UX with clear navigation, responsive design, and some advanced features, but there is room for improvement to provide a more engaging and personalized user experience."],
                [4, "The website has good UX practices in place, with clear navigation, fast loading speed, responsive design, and advanced features, resulting in an improved user experience and increased engagement."],
                [5, "The website has an excellent user experience, with intuitive navigation, fast loading speed, responsive design, and advanced features that enhance the user journey and provide a personalized experience, resulting in high user satisfaction and increased conversions."]
            ]
        },
        {
            id: 3,
            Comp: "Photos",
            Desc: "Photos can add value to websites by visually conveying information, telling stories, and eliciting emotions that may not be possible with text alone. Additionally, images can break up lengthy paragraphs of text, improve the website's aesthetic appeal, and enhance user engagement and duration of stay on the site.",
            Points: [
                [1, "The website has poor quality photos with low resolution, pixelation, and poor lighting."],
                [2, "Although some photos are of decent quality, others lack consistency and do not effectively convey the brand's message."],
                [3, "The website has a mix of high and low-quality photos, with some images enhancing the brand message, while others lack consistency in style and tone."],
                [4, "The website has high-quality photos that effectively showcase the brand's message, with consistent style and tone, resulting in an engaging visual experience for users."],
                [5, "The website has stunning, high-quality photos that effectively convey the brand's message, with consistent style and tone, resulting in an exceptional visual experience that enhances user engagement and brand perception."]
            ]
        },
        {
            id: 4,
            Comp: "Menu",
            Desc: "A website's menu plays a crucial role in providing users with a structured and coherent path to navigate through its pages, facilitating their search for specific information. Additionally, a well-crafted menu can significantly enhance the user experience by minimizing user confusion and frustration, making the site more accessible, and ultimately increasing the chances of users revisiting the website.",
            Points: [
                [1, "The website has a poor menu design, with cluttered and confusing navigation, making it difficult for users to find what they need."],
                [2, "Although the menu is somewhat organized, there are too many submenus and dropdowns, making it overwhelming for users to navigate."],
                [3, "The website has a decent menu design, with clear organization and easily identifiable categories, but there is room for improvement in terms of simplifying the navigation."],
                [4, "The website has a good menu design, with clear and concise navigation, making it easy for users to find what they need quickly and efficiently."],
                [5, "The website has an excellent menu design, with intuitive and streamlined navigation, providing users with an exceptional browsing experience that enhances engagement and encourages exploration."]
            ]
        },
        {
            id: 5,
            Comp: "Color Palette",
            Desc: "A color palette aids in establishing brand identity and visual style, making the website more memorable and recognizable to users. Additionally, a well-designed color palette can create a cohesive and harmonious visual experience, improving the overall aesthetics of the site and increasing user engagement.",
            Points: [
                [1, "Website's poor color palette clashes and lacks consistency, leading to an unappealing and unreadable appearance."],
                [2, "The website's colors have some consistency but lack contrast, causing a lack of hierarchy and difficulty in focusing on key elements."],
                [3, "The website's color palette is decent, with complementary colors but needs improvement in contrast and hierarchy."],
                [4, "The website has a good color palette, with consistent colors that create a strong visual hierarchy, improving user experience."],
                [5, "The website's excellent color palette thoughtfully enhances user experience and effectively communicates the brand's message, resulting in an engaging and visually appealing site."]
            ]
        },
        {
            id: 6,
            Comp: "Functionality",
            Desc: "Functionality in websites ensures the website operates effectively and meets the needs of its users. When a website functions smoothly and with ease, it can enhance the user experience, increase user satisfaction, and ultimately lead to users returning to the website in the future.",
            Points: [
                [1, "Poor website functionality due to broken links, slow load times, and error messages."],
                [2, "Inconsistent functionality due to broken links and technical issues, resulting in an unreliable user experience."],
                [3, "Decent functionality, but needs improvement in speed and ease of use."],
                [4, "Good functionality with all features working efficiently, creating a user-friendly experience."],
                [5, "Excellent functionality with a seamless user experience, ensuring all features work smoothly, improving user satisfaction."]
            ]
        },
        {
            id: 7,
            Comp: "Originality",
            Desc: "Originality is relevant for websites as it enables them to stand out from the competition, creating a lasting impression on users. A unique website can establish brand identity, and enhance user engagement and time spent on the site.",
            Points: [
                [1, "The website lacks originality, with overused templates, cliched designs, and no unique features, making it difficult to distinguish from competitors."],
                [2, "Although some unique features are present, the website relies heavily on overused templates and design cliches, resulting in a lack of creativity and originality."],
                [3, "The website has some original elements, such as unique designs and features, but there is room for improvement in terms of standing out from competitors."],
                [4, "The website has good originality, with creative and innovative designs and features that set it apart from competitors."],
                [5, "The website is highly original, with a unique and distinctive design and features that are unlike any others in the industry, resulting in a memorable and exceptional user experience."]
            ]
        }
    ]
    // 
    const calculateScore = () => {
        const allSelects = document.querySelectorAll('.ddQuizScore')
        var total = 0
        var things = []
        for (var i = 0; i < allSelects.length; i = i + 1) {
            const select = allSelects[i].value
            things.push(select)
        }
        var string = ""

        if (!things.includes("- Select one -")) {
            for (var i = 0; i < things.length; i = i + 1) {
                const num = parseInt(things[i].split('.')[0])
                total += num
                const text = scorePoints[i].Points[num - 1][1]
                string += text + " "
            }
            setDetails(string)
    
            // 
            const tot = total / 40
            setTotalScore(tot)
        }
    }

    const [details, setDetails] = useState("")
    const [totalScore, setTotalScore] = useState(0)

    useEffect(() => {
        closeNav()
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='main'>
            <Navigation />
            <h1 className='webline-title'>Website Health Calculator</h1>

            <div className='webline-panel2'>
                <h2>
                    We hold high standards when building a website. Below is a grading system designed to give you all you need to assess any website on its performance and presentation.
                </h2>
            </div>

            <div className='calc-components'>
                <h1 className='comp-head'>Website Standards</h1>
                <br />
                <div className='comps'>
                    {
                        comps.map((comp, i) => {
                            return (
                                <div key={i} className='calc-comp' onClick={() => { compID == comp.id ? setCompID(-1) : setCompID(comp.id) }}>
                                    <h1 className='comp-name'>{comp.Name}</h1>
                                    <p className='comp-desc'>{comp.Desc}</p>

                                    {
                                        compID == comp.id ?
                                            <div>
                                                <br />
                                                {
                                                    comp.Points.map((point, j) => {
                                                        return (
                                                            <ul className='comp-points' key={j}>
                                                                <li className='comp-point'>{point}</li>
                                                            </ul>
                                                        )
                                                    })
                                                }
                                            </div> : <div></div>
                                    }

                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <div className='divider'></div>
            <h1 className='quiz-large-head padding'>
                What condition is your website in? <span className='yellow'>Let's find out!</span>
            </h1>

            <div className='quiz'>
                <h4 className='quiz-head'>Grade the site as accurately as possible based on the components above. The score will be revealed at the bottom of the scoring sheet.</h4>
                <br />
                <div className='quiz-wrap'>
                    {
                        scorePoints.map((thing, i) => {
                            return (
                                <div key={i} className='quiz-block'>
                                    <h4>Rate your site based on <b className='yellow'>{thing.Comp}</b>.</h4>
                                    <p>{thing.Desc}</p>
                                    <br />
                                    <div className='quiz-options'>
                                        <select className="ddQuizScore">
                                            <option>- Select one-</option>
                                            {
                                                thing.Points.map((point, j) => {
                                                    return (
                                                        <option key={j}>{point[0]}. {
                                                            point[0] == 1 ? "Not Good" :
                                                                point[0] == 2 ? "Needs Improvement" :
                                                                    point[0] == 3 ? "Average" :
                                                                        point[0] == 4 ? "Good" :
                                                                            point[0] == 5 ? "Fantastic!" : ""
                                                        }</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <br />
                <button className='quiz-btn' onClick={calculateScore}>Calculate!</button>
                {
                    details != "" ?
                        <div className='score'>
                            <h1>This site scored: <span className='yellow'>{(totalScore * 100).toFixed(1)}%</span> </h1>
                            <p>{details}</p>
                        </div> : <div></div>
                }
            </div>

            <Footer />
        </div>
    )
}
