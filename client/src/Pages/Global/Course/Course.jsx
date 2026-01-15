import React from 'react';

// Component Imports
import CoursesHero from '../../../Components/Global/Course/CourseHero';
import FeaturedCourses from '../../../Components/Global/Course/FeaturedCourses';
import CourseFilters from '../../../Components/Global/Course/CourseFilter';
import CourseGrid from '../../../Components/Global/Course/CourseGrid';
import BatchPreview from '../../../Components/Global/Batch/BatchPreview';
import LearningIndicators from '../../../Components/Global/Course/LearningIndicators';
import HelpMeChoose from '../../../Components/Global/Others/HelpMeChoose';
import BottomCTA from '../../../Components/Global/Course/BottomCTA';

const Course = () => {
  return (
    <div className="bg-white min-h-screen font-sans w-full">
      
      {/* 1. Hero Section (Full Width) */}
      <CoursesHero />

      {/* 2. Featured Carousel (Full Width with internal container) */}
      <FeaturedCourses />

      {/* 3. Main Content Layout (Sidebar + Grid) */}
      <section className="w-full  px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* Sidebar: Fixed width, Sticky behavior handled inside component */}
          {/* Note: Ensure CourseFilters has 'shrink-0' in its own class */}
          <CourseFilters />

          {/* Grid: Takes remaining space */}
          <div className="flex-1 w-full min-w-0">
             <CourseGrid />
          </div>

        </div>
      </section>

      {/* 4. Post-Grid Sections (Full Width Stacks) */}
      <BatchPreview />
      <LearningIndicators />
      <HelpMeChoose />
      <BottomCTA />

    </div>
  );
};

export default Course;