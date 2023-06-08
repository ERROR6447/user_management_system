/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState, useRef, useEffect } from "react";
import { type Course } from "../dashboard/DashboardComponent";
import "./Coursedetails.css";
import { Card, Button } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addChapters,
  deleteChapter,
  getChapterForCourse,
  updateChapters,
} from "../../api/chapter";
import { getCourseById } from "../../api/courses";

interface SubCategory {
  _id: string;
  id: number;
  title: string;
  description: string;
  practical: string;
  image: File | null;
}

const Coursedetails: React.FC = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCategoryTitle, setSubCategoryTitle] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [subCategoryDescription, setSubCategoryDescription] = useState("");
  const [subCategoryPractical, setSubCategoryPractical] = useState("");
  const [chapterId, setchapterId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>({});
  const navigator = useNavigate();

  const fetchCourse = async () => {
    try {
      const resp: any = await getCourseById(courseId);
      if (resp.status !== 200) {
        console.log("Error While Fetching Course: ", resp);
        return;
      }

      console.log("Course:", resp.data.course);
      setCourse(resp.data.course);
      fetchChapterForCourses(resp.data.course._id).catch((err) => [
        console.log("Error WHile Fetching Chapters: ", err),
      ]);
    } catch (err) {
      console.log("Error While Fetching Course Details: ", err);
    }
  };
  const toggleSidebar = () => {
    setShowDetails(true);
  };
  const fetchChapterForCourses = async (courseId: any) => {
    try {
      const resp: any = await getChapterForCourse(courseId);
      if (resp.status !== 200) {
        console.log("Error While Fetching Course: ", resp);
        return;
      }
      console.log("Chapters:", resp.data.chapters);
      setSubCategories(resp.data.chapters);
    } catch (err) {
      console.log("Error While Fetching Course: ", err);
    }
  };

  useEffect(() => {
    if (!course._id) {
      fetchCourse();
    }

    if (course._id) {
      fetchChapterForCourses(course._id).catch((err) => [
        console.log("Error WHile Fetching Chapters: ", err),
      ]);
    }
  }, []);
  const handleModal = () => {
    setShowDetails(false);
  };
  const addSubCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editIndex !== null) {
      const chapter = {
        title: subCategoryTitle,
        description: subCategoryDescription,
        practical: subCategoryPractical,
        image: imageFile,
      };

      console.log("ChapterId: ", chapterId);

      updateChapters(chapterId, chapter)
        .then(async (resp: any) => {
          if (resp.status !== 200) {
            console.log("Error While updating Chapter:", resp);
            return;
          }
          fetchChapterForCourses(course._id).catch((err) => [
            console.log("Error WHile Fetching Chapters: ", err),
          ]);
          console.log("Chapter updated For Course:", resp);
        })
        .catch((err) => {
          console.log("Error While updating Chapter: ", err);
        });

      setEditIndex(null);
    } else {
      const chapter = {
        title: subCategoryTitle,
        description: subCategoryDescription,
        practical: subCategoryPractical,
        image: imageFile,
      };

      addChapters(course._id, chapter)
        .then(async (resp: any) => {
          if (resp.status !== 200) {
            console.log("Error While Adding Chapter:", resp);
            return;
          }
          fetchChapterForCourses(course._id).catch((err) => [
            console.log("Error WHile Fetching Chapters: ", err),
          ]);
          console.log("Chapter Added For Course:", resp);
        })
        .catch((err) => {
          console.log("Error While Adding Chapter: ", err);
        });
    }

    setSubCategoryTitle("");
    setSubCategoryDescription("");
    setSubCategoryPractical("");
    setImageFile(null);
    if (fileInputRef.current != null) {
      fileInputRef.current.value = "";
    }

    fetchChapterForCourses(course._id).catch((err) => [
      console.log("Error WHile Fetching Chapters: ", err),
    ]);
  };

  const handleEdit = (index: number, cchapterId: string) => {
    const subCategoryToEdit = subCategories[index];
    setSubCategoryTitle(subCategoryToEdit.title);
    setSubCategoryDescription(subCategoryToEdit.description);
    setSubCategoryPractical(subCategoryToEdit.practical);
    setImageFile(subCategoryToEdit.image);
    setchapterId(cchapterId);
    setEditIndex(index);
    console.log("Passed: ", cchapterId);
    console.log("ChapterId: ", chapterId);
    setShowDetails(true);
  };

  const handleDelete = (index: number, chapterId: string) => {
    deleteChapter(chapterId)
      .then(async (resp: any) => {
        if (resp.status !== 200) {
          console.log("Error While deleting Chapter:", resp);
          return;
        }
        fetchChapterForCourses(course._id).catch((err) => [
          console.log("Error WHile Fetching Chapters: ", err),
        ]);
        console.log("Chapter deleted For Course:", resp);
      })
      .catch((err) => {
        console.log("Error While deleting Chapter: ", err);
      });

    setEditIndex(null);

    fetchChapterForCourses(course._id).catch((err) => [
      console.log("Error WHile Fetching Chapters: ", err),
    ]);
  };

  return (
    <>
      <div className="container CourseContainer">
        <button
          className="back-btn"
          onClick={() => {
            navigator("/Admindashboard");
          }}
        >
          &larr; &nbsp;Back
        </button>

        <div className="course-details">
          <h2 className="fs-1 fw-bold">{course.title}</h2>
          <p className="py-2">{course.description}</p>

          <button className="btn btn-primary mt-4" onClick={toggleSidebar}>
            {showDetails ? "Close" : "Add Course"}
          </button>

          <div className="subcategories">
            <h5>List Of Chapters</h5>
            {subCategories.map((subCategory, index) => (
              <Card key={index} className="mt-4">
                <Card.Body className="p-4 w-auto">
                  <div className="d-flex justify-content-between">
                    <Card.Title className="title">
                      {subCategory.title}
                    </Card.Title>
                    <div className="card-header-icons">
                      <Button
                        variant="link"
                        onClick={() => {
                          handleEdit(index, subCategory._id);
                        }}
                      >
                        <BsPencil />
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => {
                          handleDelete(index, subCategory._id);
                        }}
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </div>
                  <Card.Text>{subCategory.description}</Card.Text>
                  <Card.Text>Practical: {subCategory.practical}</Card.Text>
                  {subCategory.image != null && (
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
      {showDetails && (
        <div className="sidebar sidebar-open">
          <div className="card m-4">
          <div className="title-card">
           <h5 className="m-3">Manage Chapters</h5>
          </div>
          <form onSubmit={addSubCategory} className="m-4">
            <div className="form-group">
              <label>Chapter Title</label>
              <input
                type="text"
                className="form-control"
                value={subCategoryTitle}
                onChange={(e) => {
                  setSubCategoryTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Chapter Description</label>
              <textarea
                className="form-control"
                value={subCategoryDescription}
                onChange={(e) => {
                  setSubCategoryDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Practical</label>
              <input
                type="text"
                className="form-control"
                value={subCategoryPractical}
                onChange={(e) => {
                  setSubCategoryPractical(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                ref={fileInputRef}
                onChange={(e) => {
                  setImageFile(
                    e.target.files != null ? e.target.files[0] : null
                  );
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Add Chapter
            </button>
          </form>
          <button className="ms-3 w-25" onClick={handleModal}>
            back
          </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Coursedetails;
