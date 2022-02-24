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

  useEffect(() => {
    const getBlogs = async () => {
      let blogTemp: any = []
      await fetch(
        'https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/getContent?category=blog-news'
      )
        .then((response) => {
          return response.json()
        })
        .then(async (data) => {
          const blogs = data.blogs
          blogs.forEach(async (blog: any) => {
            await blogTemp.push({
              ...blogTemp,
              ...blog,
              id: blog.id,
            })
          })
          setBlogs(blogTemp)
        })
      setLoading(1)
    }
    getBlogs()
  }, [])

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
      </div>
    </>
  )
}

export {BlogNews}
