import React, { useState, useRef } from 'react'
import { type Course } from '../dashboard/DashboardComponent'
import './Coursedetails.css'
import { Card, Button } from 'react-bootstrap'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'

interface SubCategory {
  id: number
  title: string
  description: string
  practical: string
  image: File | null
}

const Coursedetails: React.FC<{ course: Course, goBack: () => void }> = ({ course, goBack }) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [subCategoryTitle, setSubCategoryTitle] = useState('')
  const [subCategoryDescription, setSubCategoryDescription] = useState('')
  const [subCategoryPractical, setSubCategoryPractical] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const addSubCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editIndex !== null) {
      const updatedSubCategories = [...subCategories]
      const updatedSubCategory = {
        id: updatedSubCategories[editIndex].id,
        title: subCategoryTitle,
        description: subCategoryDescription,
        practical: subCategoryPractical,
        image: imageFile
      }
      updatedSubCategories[editIndex] = updatedSubCategory
      setSubCategories(updatedSubCategories)
      setEditIndex(null)
    } else {
      const newSubCategory: SubCategory = {
        id: Date.now(),
        title: subCategoryTitle,
        description: subCategoryDescription,
        practical: subCategoryPractical,
        image: imageFile
      }
      setSubCategories([...subCategories, newSubCategory])
    }

    setSubCategoryTitle('')
    setSubCategoryDescription('')
    setSubCategoryPractical('')
    setImageFile(null)
    if (fileInputRef.current != null) {
      fileInputRef.current.value = ''
    }
  }

  const handleEdit = (index: number) => {
    const subCategoryToEdit = subCategories[index]
    setSubCategoryTitle(subCategoryToEdit.title)
    setSubCategoryDescription(subCategoryToEdit.description)
    setSubCategoryPractical(subCategoryToEdit.practical)
    setImageFile(subCategoryToEdit.image)
    setEditIndex(index)
  }

  const handleDelete = (index: number) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index)
    setSubCategories(updatedSubCategories)
    setEditIndex(null)
  }

  return (
    <div className="container CourseContainer">
      <button className="back-btn" onClick={goBack}>
        &larr; &nbsp;Back
      </button>

      <div className="course-details">
        <h2 className='fs-1 fw-bold'>{course.title}</h2>
        <p className="py-2">{course.description}</p>
        <form onSubmit={addSubCategory}>
        <div className="form-group">
            <label>Chapter Title</label>
            <input
              type="text"
              className="form-control"
              value={subCategoryTitle}
              onChange={(e) => { setSubCategoryTitle(e.target.value) }}
            />
          </div>
          <div className="form-group">
            <label>Chapter Description</label>
            <textarea
              className="form-control"
              value={subCategoryDescription}
              onChange={(e) => { setSubCategoryDescription(e.target.value) }}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Practical</label>
            <input
              type="text"
              className="form-control"
              value={subCategoryPractical}
              onChange={(e) => { setSubCategoryPractical(e.target.value) }}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              ref={fileInputRef}
              onChange={(e) => { setImageFile(e.target.files != null ? e.target.files[0] : null) }}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Add Chapter
          </button>
        </form>
        <div className="subcategories">
          <h5>List Of Chapters</h5>
          {subCategories.map((subCategory, index) => (
            <Card key={index} className='mt-4'>
              <Card.Body className='p-4 w-auto'>
            <div className='d-flex justify-content-between'>
                <Card.Title className='title'>{subCategory.title}</Card.Title>
                <div className="card-header-icons">
                    <Button variant="link" onClick={() => { handleEdit(index) }}>
                      <BsPencil />
                    </Button>
                    <Button variant="link" onClick={() => { handleDelete(index) }}>
                      <BsTrash />
                    </Button>
                  </div>
            </div>
                <Card.Text>{subCategory.description}</Card.Text>
                <Card.Text>Practical: {subCategory.practical}</Card.Text>
                {(subCategory.image != null) && (
                  <img
                    src={URL.createObjectURL(subCategory.image)}
                    alt="Subcategory Image"
                    className="img-fluid mt-3"
                  />
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Coursedetails
