import axiosInstance from '../config/axiosInstance'

export const addCourse = async (payload: any) => (
  await axiosInstance('/addCourse', {
    method: 'POST',
    data: payload
  }).then((resp) => resp).catch((err) => {
    console.log(err)
  })
)

export const updateCourse = async (courseId: string, payload: any) => (
  await axiosInstance(`/updateCourse/${courseId}`, {
    method: 'PUT',
    data: payload
  }).then((resp) => resp).catch((err) => {
    console.log(err)
  })
)

export const deleteCourse = async (courseId: string) => (
  await axiosInstance(`/deleteCourse/${courseId}`, {
    method: 'DELETE'
  }).then((resp) => resp).catch((err) => {
    console.log(err)
  })
)

export const getAllCourses = async () => (
  await axiosInstance('/getAllCourses', {
    method: 'GET'
  }).then((resp) => resp).catch((err) => {
    console.log(err)
  })
)

export const getCourses = async (studentId: string) => (
  await axiosInstance(`/getCourses/${studentId}`, {
    method: 'GET'
  }).then((resp) => resp).catch((err) => {
    console.log(err)
  })
)
