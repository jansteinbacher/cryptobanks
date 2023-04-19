import React from "react";
import Bitcoin from "../images/Bitcoin.png";
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function BlogArticle() {
  const [activeSection, setActiveSection] = useState('');
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Find all h2 tags in the article and create the table of contents
    const h2Tags = Array.from(document.querySelectorAll('h2'));
    const tableOfContents = h2Tags.map((tag) => ({
      id: tag.id,
      text: tag.textContent,
    }));
    setSections(tableOfContents);

    // Update the active section in the table of contents when the user scrolls
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionIds = h2Tags.map((tag) => tag.id);
      const activeIndex = sectionIds.findIndex(
        (id, i) => scrollTop < h2Tags[i + 1]?.offsetTop - 300 || i === sectionIds.length - 1
      );
      setActiveSection(sectionIds[activeIndex]);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChangeSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="flex flex-row ">
      <div className="w-2/12 text-white p-6"></div>
      <div className="w-7/12 text-white p-6">
        <h1 id="title" className="text-3xl font-bold mb-6">The Rise and Fall of Bitcoin: An Analysis</h1>
        <p className="text-lg mb-4">Bitcoin, the world's first decentralized digital currency, has become a household name in recent years. 
          Created in 2009 by an anonymous individual or group using the pseudonym "Satoshi Nakamoto," the cryptocurrency 
          has had a tumultuous journey from obscurity to widespread acceptance. In this article, we will explore the rise 
          and fall of Bitcoin, its impact on the global economy, and its future prospects.</p>


        <h2 className="text-xl font-bold mb-6" id="section1">The Rise of Bitcoin</h2>
        <p className="text-lg mb-4">
        In the early days, Bitcoin was a relatively unknown concept, with few people outside the tech community having heard 
        of it. It gained popularity in 2011 when it was used to purchase illegal drugs on the now-defunct online marketplace 
        Silk Road. However, it was not until the 2013 price surge that Bitcoin gained mainstream attention.
        </p>
        <p className="text-lg mb-4">
        The price of Bitcoin skyrocketed from around $13 in January 2013 to over $1,100 by November of the same year, an 
        increase of more than 8,000%. This surge was attributed to a combination of factors, including increased media 
        coverage, growing acceptance by retailers, and speculation by investors.
        </p>


        <p className="text-lg mb-4">
        Bitcoin's decentralized nature was also a major selling point, as it offered an alternative to traditional fiat 
        currencies controlled by governments and financial institutions. The blockchain technology underlying Bitcoin was 
        seen as revolutionary, with the potential to transform not just currency but also other industries such as finance 
        and healthcare.
        </p>
          <img src={Bitcoin} link="/" alt="Bitcoin" className="w-1/4 cursor-pointer mx-auto mb-8 mt-4" />
        
        
        <h2 className="text-xl font-bold mb-6" id="section2">The Fall of Bitcoin</h2>
        <p className="text-lg mb-4">
        The 2013 price surge was short-lived, and Bitcoin's value plummeted in 2014, with the currency losing more than 80% 
        of its value. This was attributed to a number of factors, including regulatory uncertainty, hacking incidents, and 
        the collapse of the Mt. Gox exchange, which was handling a significant portion of Bitcoin transactions at the time.
        </p>
        <p className="text-lg mb-4">
        Bitcoin's reputation was also tarnished by its association with illegal activities, particularly on dark web 
        marketplaces. Governments around the world began to take notice, with some countries banning Bitcoin outright, 
        while others introduced regulatory frameworks to monitor its use.
        </p>
        <p className="text-lg mb-4">
        Despite these setbacks, Bitcoin has remained resilient, and its value has continued to fluctuate wildly. In 2017, 
        Bitcoin experienced another price surge, with its value reaching an all-time high of nearly $20,000 in December of 
        that year. However, this was followed by a sharp decline in 2018, with the currency losing more than 80% of its value
        once again.
        </p>
        <h2 className="text-xl font-bold mb-6" id="section3">The Future of Bitcoin</h2>
        <p className="text-lg mb-4">
        Despite its volatility, Bitcoin has continued to attract both investors and critics. Proponents argue that it offers 
        a decentralized alternative to traditional banking systems and could be a powerful tool for financial inclusion. 
        However, critics argue that its lack of regulation makes it a breeding ground for illegal activities and that its 
        value is based on speculation rather than any intrinsic worth.
        </p>
        <p className="text-lg mb-4">

        Looking to the future, it is clear that Bitcoin and other cryptocurrencies are here to stay. However, their impact 
        on the global economy remains uncertain. Some experts predict that cryptocurrencies could eventually replace 
        traditional fiat currencies, while others believe that they will remain a niche asset class. It is also likely 
        that governments will continue to regulate and monitor cryptocurrencies, which could impact their long-term 
        viability.
        </p>
        <h2 className="text-xl font-bold mb-6" id="section4">Conclusion</h2>
        <p className="text-lg mb-4">
        Bitcoin has had a rollercoaster ride since its inception, with its value fluctuating wildly and its reputation 
        fluctuating between revolutionary technology and a tool for criminals. While its future remains uncertain, it is 
        clear that cryptocurrencies are here to stay and will continue to shape the global economy in the years to come. 
        As with any new technology, it is up to governments, businesses, and individuals to navigate the opportunities and 
        challenges presented by Bitcoin and other cryptocurrencies.
        </p>


      </div>
      <div className="w-3/12 p-6">
        <div className="sticky top-24 ">
          <h3 className="font-bold text-white text-xl font-bold mb-4">Inhaltsverzeichnis</h3>
          <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`w-full text-left text-white ${section.id === activeSection ? 'font-bold' : ''}`}
                onClick={() => handleChangeSection(section.id)}
              >
                {section.text}
              </button>
            </li>
          ))}

         
          <li><a href="# " className={`w-full text-left text-white fixed bottom-0 mb-40`}> 
            To the top 
            <FaArrowUp className="inline-block ml-1" />
            </a></li>
        </ul>
        </div>
      </div>
    </div>
  );
}

export default BlogArticle;
