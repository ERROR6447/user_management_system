import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import Coursedetails from '../../Component/Course/Coursedetails'
import './DashboardComponent.css'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { type RootState } from '../../store/Store'
import { addCourse } from '../../slice/CourseSlice'

export interface Course {
  title: string
  description: string
}

export interface SubCategory {
  title: string
  practical: boolean
}

const DashboardComponent: React.FC = () => {
  const dispatch = useDispatch()

  const courses = useSelector((state: RootState) => state.course.courses)

  const studentData = [{ label: 'Total Students', data: 100 }]

  const courseData = [{ label: 'Total Courses', data: 20 }]

  const [showDetails, setShowDetails] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validate: (values: { title: string, description: string }) => {
      const errors: { title?: string, description?: string } = {}
      if (values.title === '') {
        errors.title = 'Title is required'
      }
      if (values.description === '') {
        errors.description = 'Description is required'
      }
      return errors
    },
    onSubmit: (values) => {
      const newCourse: Course = {
        title: values.title,
        description: values.description
      }
      dispatch(addCourse(newCourse))
      formik.resetForm()
    }
  })
  const handleArrowClick = (course: Course) => {
    setSelectedCourse(course)
    setShowDetails(true)
  }

  const handleGoBack = () => {
    setShowDetails(false)
    setSelectedCourse(null)
  }

  return (
    <>
      {!showDetails
        ? (
          <div className="container DashboardContainer">
            <h3>Dashboard</h3>

            <div className="row mt-4">
              <div className="col-md-6">
                <BarChart width={400} height={300} data={studentData}>
                  <Bar dataKey="data" fill="rgba(54, 162, 235, 0.6)" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                </BarChart>
              </div>
              <div className="col-md-6">
                <BarChart width={400} height={300} data={courseData}>
                  <Bar dataKey="data" fill="rgba(75, 192, 192, 0.6)" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                </BarChart>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">Add Courses</div>
                  <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.title === 'true'
                          ? (
                          <div className="error">{formik.errors.title}</div>
                            )
                          : null}
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                        ></textarea>
                        {formik.errors.description === 'true'
                          ? (
                          <div className="error">{formik.errors.description}</div>
                            )
                          : null}
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary mt-3 adddbtn"
                          disabled={!formik.isValid}
                        >
                          Add Courses
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="text-center">
                <h2 className="fw-bold">Courses</h2>
              </div>
              {courses.map((course, index) => (
                <div className="col-md-4 mt-3" key={index}>
                  <div className="card mt-3">
                    <div className="card-header text-center">{course.title}</div>
                    <div className="card-body Description">
                      <p className="card-text">{course.description}</p>
                      <div className="float-end ">
                        <button
                          className="arrow-button"
                          onClick={() => {
                            handleArrowClick(course)
                          }}
                        >
                          &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )
        : selectedCourse != null && <Coursedetails course={selectedCourse} goBack={handleGoBack} />}
    </>
  )
}

export default DashboardComponent
