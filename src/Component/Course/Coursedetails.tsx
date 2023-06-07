/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState, useRef, useEffect } from 'react'
import { type Course } from '../dashboard/DashboardComponent'
import './Coursedetails.css'
import { Card, Button } from 'react-bootstrap'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { addChapters, deleteChapter, getChapterForCourse, updateChapters } from '../../api/chapter'

interface SubCategory {
  _id: string
  id: number
  title: string
  description: string
  practical: string
  image: File | null
}

const Coursedetails: React.FC<{ course: any, goBack: () => void }> = ({ course, goBack }) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [subCategoryTitle, setSubCategoryTitle] = useState('')
  const [subCategoryDescription, setSubCategoryDescription] = useState('')
  const [subCategoryPractical, setSubCategoryPractical] = useState('')
  const [chapterId, setchapterId] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  // const getChapterForCourse = async () => {
  //   try {
  //     // const resp: any = await getChapterForCourse(course._id)
  //     const resp: any = {}
  //     console.log('Something:', course)
  //     if (resp.status !== 200) {
  //       console.log('Error While Fetching Chapter for Course: ', resp)
  //       return
  //     }
  //     console.log('Chapters:', resp.data.chapters)
  //     // setFetchedCourse(resp.data.chapters)
  //   } catch (err) {
  //     console.log('Error While Fetching Course: ', err)
  //   }
  // }

  const fetchChapterForCourses = async () => {
    try {
      const resp: any = await getChapterForCourse(course._id)
      if (resp.status !== 200) {
        console.log('Error While Fetching Course: ', resp)
        return
      }
      console.log('Chapters:', resp.data.chapters)
      setSubCategories(resp.data.chapters)
    } catch (err) {
      console.log('Error While Fetching Course: ', err)
    }
  }

  useEffect(() => {
    fetchChapterForCourses().catch(err => [
      console.log('Error WHile Fetching Chapters: ', err)
    ])
  }, [])

  const addSubCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editIndex !== null) {
      // const updatedSubCategories = [...subCategories]
      // const updatedSubCategory = {
      //   _id:courseId
      //   id: updatedSubCategories[editIndex].id,
      //   title: subCategoryTitle,
      //   description: subCategoryDescription,
      //   practical: subCategoryPractical,
      //   image: imageFile
      // }
      // updatedSubCategories[editIndex] = updatedSubCategory
      // setSubCategories(updatedSubCategories)

      const chapter = {
        title: subCategoryTitle,
        description: subCategoryDescription,
        practical: subCategoryPractical,
        image: imageFile
      }

      console.log('ChapterId: ', chapterId)

      updateChapters(chapterId, chapter).then(async (resp: any) => {
        if (resp.status !== 200) {
          console.log('Error While updating Chapter:', resp)
          return
        }
        console.log('Chapter updated For Course:', resp)
      }).catch(err => {
        console.log('Error While updating Chapter: ', err)
      })

      setEditIndex(null)
    } else {
      // const newSubCategory: SubCategory = {
      //   _id: null,
      //   id: Date.now(),
      //   title: subCategoryTitle,
      //   description: subCategoryDescription,
      //   practical: subCategoryPractical,
      //   image: imageFile
      // }

      // setSubCategories([...subCategories, newSubCategory])

      const chapter = {
        title: subCategoryTitle,
        description: subCategoryDescription,
        practical: subCategoryPractical,
        image: imageFile
      }

      addChapters(course._id, chapter).then(async (resp: any) => {
        if (resp.status !== 200) {
          console.log('Error While Adding Chapter:', resp)
          return
        }
        console.log('Chapter Added For Course:', resp)
      }).catch(err => {
        console.log('Error While Adding Chapter: ', err)
      })
    }

    setSubCategoryTitle('')
    setSubCategoryDescription('')
    setSubCategoryPractical('')
    setImageFile(null)
    if (fileInputRef.current != null) {
      fileInputRef.current.value = ''
    }

    fetchChapterForCourses().catch(err => [
      console.log('Error WHile Fetching Chapters: ', err)
    ])
  }

  const handleEdit = (index: number, cchapterId: string) => {
    const subCategoryToEdit = subCategories[index]
    setSubCategoryTitle(subCategoryToEdit.title)
    setSubCategoryDescription(subCategoryToEdit.description)
    setSubCategoryPractical(subCategoryToEdit.practical)
    setImageFile(subCategoryToEdit.image)
    setchapterId(cchapterId)
    setEditIndex(index)
    console.log('Passed: ', cchapterId)
    console.log('ChapterId: ', chapterId)
  }

  const handleDelete = (index: number, chapterId: string) => {
    // const updatedSubCategories = subCategories.filter((_, i) => i !== index)
    // setSubCategories(updatedSubCategories)
    deleteChapter(chapterId).then(async (resp: any) => {
      if (resp.status !== 200) {
        console.log('Error While deleting Chapter:', resp)
        return
      }
      console.log('Chapter deleted For Course:', resp)
    }).catch(err => {
      console.log('Error While deleting Chapter: ', err)
    })

    setEditIndex(null)

    fetchChapterForCourses().catch(err => [
      console.log('Error WHile Fetching Chapters: ', err)
    ])
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
                    <Button variant="link" onClick={() => { handleEdit(index, subCategory._id) }}>
                      <BsPencil />
                    </Button>
                    <Button variant="link" onClick={() => { handleDelete(index, subCategory._id) }}>
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
