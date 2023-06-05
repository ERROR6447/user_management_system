import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './Student.css'

interface Chapter {
  id: number
  title: string
  practical: string
}

interface CourseDetailsProps {
  course: {
    id: number
    title: string
    description: string
    chapters: Chapter[]
  }
  onBack: () => void
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onBack }) => {
  // const [practicalSubmissions, setPracticalSubmissions] = useState<string[]>(
  //   []
  // )
  const [gradesVisible, setGradesVisible] = useState(false)

  // const handlePracticalSubmit = (chapterId: number, submission: string) => {
  //   const updatedSubmissions = [...practicalSubmissions]
  //   updatedSubmissions[chapterId - 1] = submission
  //   setPracticalSubmissions(updatedSubmissions)
  // }

  const handleShowGrades = () => {
    setGradesVisible(true)
  }

  const { getRootProps, getInputProps } = useDropzone()

  return (
    <div className="container-mained">
      <div className="course-details">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>

        {course.chapters.map((chapter) => (
          <div className="chapter" key={chapter.id}>
            <h3 className="chapter-title">{chapter.title}</h3>
            <p className="chapter-practical">{chapter.practical}</p>
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop a file here, or click to select a file </p>
            </div>
          </div>
        ))}
        <button className="back-button" onClick={onBack}>
          Back
        </button>

        <div className={`grade-section ${gradesVisible ? 'show' : ''}`}>
          {course.chapters.map((chapter) => (
            <div className="grade-item" key={chapter.id}>
              <h4 className="grade-title">{chapter.title} Grade:</h4>
              <p className="grade-value">90%</p>
            </div>
          ))}
        </div>

        <button className="show-grades-button" onClick={handleShowGrades}>
          Show Grades
        </button>
      </div>
    </div>
  )
}

export default CourseDetails
