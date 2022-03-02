import React from 'react'
import {useState, useEffect} from 'react'
import {collection, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {app, db} from '../../firebase'
import {MixedWidget5} from '../../_metronic/partials/widgets'
import {PageTitle} from '../../_metronic/layout/core'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BallTriangle, Triangle, CradleLoader} from 'react-loader-spinner'

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  description: string
}

const BlogNews: React.FC<Props> = ({className, color, svgIcon, iconColor, title, description}) => {
  const [loading, setLoading] = useState(0)
  const [blogs, setBlogs] = useState([])
  const [lastVisible, setLastVisible] = useState([])
  const [firstVisible, setFirstVisible] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState(1)

  useEffect(() => {
    getBlogs()
  }, [])

  const getBlogs = async () => {
    let blogTemp: any = []
    await fetch(
      'https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/getContent?category=blog-news'
    )
      .then((response) => {
        return response.json()
      })
      .then(async (data) => {
        let firstVisibleTemp = firstVisible
        let lastVisibleTemp = lastVisible

        //@ts-ignore
        firstVisibleTemp.push(data.firstVisible)
        //@ts-ignore
        lastVisibleTemp.push(data.lastVisible)

        await setFirstVisible(firstVisibleTemp)
        await setLastVisible(lastVisibleTemp)

        const blogs = data.blogs
        blogs.forEach(async (blog: any) => {
          await blogTemp.push({
            ...blogTemp,
            ...blog,
            id: blog.id,
          })
        })
        await setBlogs(blogTemp)
        await setPages(data.pages)
      })
    setLoading(1)
  }

  const goToNext = async () => {
    setLoading(0)
    let blogTemp: any = []
    await fetch(
      'https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/getContent?category=blog-news&startAfter=' +
        lastVisible[lastVisible.length - 1]
    )
      .then((response) => {
        return response.json()
      })
      .then(async (data) => {
        let firstVisibleTemp = firstVisible
        let lastVisibleTemp = lastVisible

        //@ts-ignore
        firstVisibleTemp.push(data.firstVisible)
        //@ts-ignore
        lastVisibleTemp.push(data.lastVisible)

        await setFirstVisible(firstVisibleTemp)
        await setLastVisible(lastVisibleTemp)

        const blogs = data.blogs
        blogs.forEach(async (blog: any) => {
          await blogTemp.push({
            ...blogTemp,
            ...blog,
            id: blog.id,
          })
        })
        setBlogs(blogTemp)
        setPages(data.pages)
        setCurrentPage(currentPage + 1)
      })
    setLoading(1)
  }

  const goToPrev = async () => {
    setLoading(0)
    let blogTemp: any = []
    await fetch(
      'https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/getContent?category=blog-news&startAt=' +
        firstVisible[firstVisible.length - 2]
    )
      .then((response) => {
        return response.json()
      })
      .then(async (data) => {
        let lastVisbileData: any = lastVisible,
          firstVisibleData: any = firstVisible
        await firstVisibleData.pop()
        await lastVisbileData.pop()

        setLastVisible(lastVisbileData)
        setFirstVisible(firstVisibleData)
        setCurrentPage(currentPage - 1)

        const blogs = data.blogs
        blogs.forEach(async (blog: any) => {
          await blogTemp.push({
            ...blogTemp,
            ...blog,
            id: blog.id,
          })
        })
        setBlogs(blogTemp)
        setPages(data.pages)
      })
    setLoading(1)
  }

  const renderBlogs = blogs.map((blog) => (
    <div className='col-xl-3'>
      <MixedWidget5
        className='card-xl-stretch mb-5 mb-xl-8'
        image='/media/logos/logo-5.png'
        //@ts-ignore
        time={String(blog.date)}
        //@ts-ignore
        title={blog.title}
        //@ts-ignore
        id={blog.id}
        //@ts-ignore
        description={blog.description}
        //@ts-ignore
        excerpt={blog.excerpt}
        category='blog-news'
      />
    </div>
  ))

  return (
    <>
      <PageTitle breadcrumbs={[]}>Latest Blog Posts And News</PageTitle>
      <div className='row'>
        {loading == 1 ? (
          renderBlogs
        ) : (
          <div className='d-flex flex-column-fluid flex-center'>
            <CradleLoader
            // ariaLabel="loading-indicator"
            // height="150"
            // width="150"
            // color='#ef305e'
            />
          </div>
        )}
        {loading == 1 && blogs.length > 0 ? (
          <div className={`card ${className} shadow-lg`}>
            <div className='card-header mt-5'>
              <span className='mt-5 align-items-start flex-column fw-bolder text-muted'>
                Page {currentPage} of {pages}
              </span>
              <ul className='pagination pagination-outline mt-3'>
                <li
                  className={
                    currentPage > 1 ? 'page-item previous m-1' : 'page-item previous disabled m-1'
                  }
                >
                  <a onClick={goToPrev} className='page-link'>
                    <i className='previous'></i>
                  </a>
                </li>
                <li
                  className={
                    currentPage == pages ? 'page-item next m-1 disabled' : 'page-item next m-1'
                  }
                >
                  <a onClick={goToNext} className='page-link'>
                    <i className='next'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
        {blogs.length == 0 && loading == 1? (
          <div className={`card ${className} shadow-lg`}>
            <div className='card-header mt-5'>
              <span className='mt-5 align-items-start flex-column fw-bolder text-muted'>
                No content found! Please try again later.
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export {BlogNews}
