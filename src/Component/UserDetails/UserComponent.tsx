import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store/Store' // Replace 'path/to/redux/store' with the actual path to your store configuration file
import './User.css'

interface Student {
  id: number
  name: string
  stack: string
  courses: string[]
}

const UserComponent: React.FC = () => {
  const courseTitles = useSelector((state: RootState) =>
    state.course.courses.map((course) => course.title)
  )

  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<string[]>([]) // Added state for courses
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newStudent, setNewStudent] = useState<Student>({
    id: 0,
    name: '',
    stack: '',
    courses: []
  })
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    // Fetch students from API or any data source
    // Initially, the students list will be empty
    setStudents([])
  }, [])

  useEffect(() => {
    // Fetch courses from API or any data source
    // Initially, the courses list will be empty
    setCourses([])
  }, [])

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleEditModalOpen = (student: Student) => {
    setSelectedStudent(student)
    setIsEditModalOpen(true)
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
    setSelectedStudent(null)
  }

  const handleSaveStudent = () => {
    const id = Math.floor(Math.random() * 9000) + 1000 // Generate random 4-digit ID
    const updatedNewStudent = { ...newStudent, id }
    const updatedStudents = [...students, updatedNewStudent]
    setStudents(updatedStudents)
    setNewStudent({ id: 0, name: '', stack: '', courses: [] })
    setIsModalOpen(false)
    scrollToLatestStudent()
  }

  const handleUpdateStudent = () => {
    const updatedStudents = students.map((student) => {
      if (student.id === selectedStudent?.id) {
        return {
          ...student,
          name: selectedStudent.name,
          stack: selectedStudent.stack,
          courses: selectedStudent.courses
        }
      }
      return student
    })
    setStudents(updatedStudents)
    setSelectedStudent(null)
    setIsEditModalOpen(false)
  }

  const handleDeleteStudent = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id)
    setStudents(updatedStudents)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'courses') {
      const courses = value.split(',').map((course) => course.trim())
      setNewStudent((prevStudent) => ({ ...prevStudent, [name]: courses }))
    } else {
      setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }))
    }
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'courses') {
      const courses = value.split(',').map((course) => course.trim())
      setSelectedStudent((prevStudent) =>
        prevStudent != null ? { ...prevStudent, [name]: courses } : null
      )
    } else {
      setSelectedStudent((prevStudent) =>
        prevStudent != null ? { ...prevStudent, [name]: value } : null
      )
    }
  }
  const handleCourseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      courses: [...prevStudent.courses, value]
    }))
  }

  const handleEditCourseSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setSelectedStudent((prevStudent) => {
      if (prevStudent != null) {
        const updatedCourses = [...prevStudent.courses, value]
        return { ...prevStudent, courses: updatedCourses }
      }
      return null
    })
  }

  // const handleEditDeleteCourse = (course: string) => {
  //   setSelectedStudent((prevStudent) => {
  //     if (prevStudent) {
  //       const updatedCourses = prevStudent.courses.filter((c) => c !== course);
  //       return { ...prevStudent, courses: updatedCourses };
  //     }
  //     return null;
  //   });
  // };

  const scrollToLatestStudent = () => {
    if (tableRef.current != null) {
      tableRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="container">
      <h3>Student Details</h3>
      <button onClick={handleModalOpen}>Add Student</button>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stack</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.stack}</td>
                <td>{student.courses.join(', ')}</td>
                <td>
                  <BsPencil
                    className="m-2"
                    onClick={() => {
                      handleEditModalOpen(student)
                    }}
                  />
                  <BsTrash
                    className="m-2"
                    onClick={() => {
                      handleDeleteStudent(student.id)
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="stack">Stack:</label>
            <input
              type="text"
              id="stack"
              name="stack"
              value={newStudent.stack}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="courses">Courses:</label>
            <input
              type="text"
              id="courses"
              name="courses"
              value={newStudent.courses.join(', ')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="select-course">Select Course:</label>

            <select id="select-course" onChange={handleCourseSelect}>
              <option value="">-- Select Course --</option>
              {courseTitles.map((title: any) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveStudent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isEditModalOpen} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={selectedStudent?.name ?? ''}
              onChange={handleEditInputChange}
            />
          </div>
          <div>
            <label htmlFor="stack">Stack:</label>
            <input
              type="text"
              id="stack"
              name="stack"
              value={selectedStudent?.stack ?? ''}
              onChange={handleEditInputChange}
            />
          </div>

          <div>
            <label htmlFor="courses">Courses:</label>
            <input
              type="text"
              id="courses"
              name="courses"
              value={selectedStudent?.courses.join(', ')}
              onChange={handleEditInputChange}
            />
          </div>
          <div>
            <label htmlFor="select-course">Select Course:</label>
            <select id="select-course" onChange={handleEditCourseSelect}>
              <option value="">-- Select Course --</option>
              {courseTitles.map((title: any) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateStudent}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserComponent
