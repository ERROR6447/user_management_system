import React, { useState } from 'react'
import CourseDetails from './Courses'
import './StudentCourse.css'

const StudentCourse: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: 'HTML & CSS',
      description:
        'Fundamentals for everyone. This course is for everyone at Simform in the production unit. Including web developers, mobile developers, and QAs. It gives you an overview of basic fundamentals of the world of software application development. Ranging from protocols and APIs to Code management and security.',
      chapters: [
        {
          id: 1,
          title: 'Introduction to HTML',
          practical: 'Code along with HTML examples'
        },
        {
          id: 2,
          title: 'Introduction to CSS',
          practical: 'Apply styles to HTML elements'
        },
        {
          id: 3,
          title: 'Advanced CSS Techniques',
          practical: 'Build responsive layouts and animations'
        },
        {
          id: 4,
          title: 'CSS Frameworks',
          practical: 'Utilize popular CSS frameworks like Bootstrap'
        }
      ]
    },
    {
      id: 2,
      title: 'JavaScript',
      description:
        'Fundamentals of Web Programming. This course is about learning web programming fundamentals from web server and hosting to session and browser storage.',
      chapters: [
        {
          id: 1,
          title: 'Introduction to JavaScript',
          practical: 'Write basic JavaScript code'
        },
        {
          id: 2,
          title: 'DOM Manipulation',
          practical: 'Interact with HTML elements using JavaScript'
        },
        {
          id: 3,
          title: 'Ajax and Fetch API',
          practical: 'Make asynchronous requests to servers'
        },
        {
          id: 4,
          title: 'Introduction to ES6',
          practical: 'Use modern JavaScript features'
        }
      ]
    },
    {
      id: 3,
      title: 'ReactJS',
      description: 'Learn ReactJS to build interactive web applications.',
      chapters: [
        {
          id: 1,
          title: 'Introduction to React',
          practical: 'Create a simple React component'
        },
        {
          id: 2,
          title: 'Components and Props',
          practical: 'Pass data between components'
        },
        {
          id: 3,
          title: 'State and Lifecycle',
          practical: 'Manage component state and lifecycle methods'
        },
        {
          id: 4,
          title: 'React Router',
          practical: 'Implement client-side routing in React'
        }
      ]
    },
    {
      id: 4,
      title: 'Amazon Web Services - The Big Picture',
      description:
        'Explore the big picture of Amazon Web Services and understand its key concepts and services.',
      chapters: [
        {
          id: 1,
          title: 'Introduction to AWS',
          practical:
            'Create an AWS account and navigate the AWS Management Console'
        },
        {
          id: 2,
          title: 'Compute Services',
          practical: 'Understand and use EC2 and Lambda services'
        },
        {
          id: 3,
          title: 'Storage and Database Services',
          practical: 'Utilize S3 and RDS services for data storage'
        },
        {
          id: 4,
          title: 'Networking and Security',
          practical: 'Configure VPC and security groups for AWS resources'
        }
      ]
    },
    {
      id: 5,
      title: 'Microsoft Azure - The Big Picture',
      description:
        'Get an overview of Microsoft Azure and learn about its core features and capabilities.',
      chapters: [
        {
          id: 1,
          title: 'Introduction to Azure',
          practical: 'Create an Azure account and navigate the Azure portal'
        },
        {
          id: 2,
          title: 'Compute Services',
          practical: 'Provision and manage virtual machines on Azure'
        },
        {
          id: 3,
          title: 'Storage and Database Services',
          practical: 'Use Azure Blob Storage and Azure SQL Database'
        },
        {
          id: 4,
          title: 'Networking and Security',
          practical: 'Configure network resources and security in Azure'
        }
      ]
    }
  ]

  const [selectedCourse, setSelectedCourse] = useState(null)

  const handleCourseClick = (course: any) => {
    console.log('error')
    setSelectedCourse(course)
  }

  const handleBackClick = () => {
    setSelectedCourse(null)
  }

  return (
    <div className="course-container">
      {selectedCourse != null
        ? (
        <CourseDetails course={selectedCourse} onBack={handleBackClick} />
          )
        : (
        <>
          <h2 className="course-title">Your Courses</h2>
          <div className="course-list">
            {courses.map((course) => (
              <div
                className="course-item"
                key={course.id}
                onClick={() => {
                  handleCourseClick(course)
                }}
              >
                <h3 className="course-item-title">{course.title}</h3>
                <p className="course-item-description">{course.description}</p>
              </div>
            ))}
          </div>
        </>
          )}
    </div>
  )
}

export default StudentCourse
