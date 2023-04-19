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
        <h1 id="title" className="text-3xl font-bold mb-6">Title</h1>
        <p className="text-lg mb-4">
          Text on the top.
          </p>


        <h2 className="text-xl font-bold mb-6" id="section1">First Section</h2>
        <p className="text-lg mb-4">
        Text...
        </p>
        <p className="text-lg mb-4">
        Text...
        </p>

        <blockquote className="border-l-4 border-gray-400 italic my-4 pl-4 py-2 mb-16 mt-16">
        "Hier ist der Text des Zitats."
        </blockquote>

        

        
        <img src={Bitcoin} link="/" alt="Bitcoin" className="w-1/4 cursor-pointer mx-auto mb-8 mt-4" />
        
        
        <h2 className="text-xl font-bold mb-6" id="section2">Second Section</h2>
        <p className="text-lg mb-4">
        Text
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
