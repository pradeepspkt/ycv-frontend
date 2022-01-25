/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { app, db } from '../../firebase';
import {
    MixedWidget5,
} from '../../_metronic/partials/widgets'
import { PageTitle } from '../../_metronic/layout/core'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle, Triangle , CradleLoader} from 'react-loader-spinner'

type Props = {
    className: string
    color: string
    svgIcon: string
    iconColor: string
    title: string
    description: string
}

const BlogNews: React.FC<Props> = ({
    className,
    color,
    svgIcon,
    iconColor,
    title,
    description,
}) => {

    const [loading, setLoading] = useState(0);
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        const getBlogs = async (category: string) => {
            setBlogs([])
            let blogTemp: any = []
            const querySnapshot = await getDocs(collection(db, "content"));
            querySnapshot.forEach(async (doc: any) => {
                if (doc.data().category == category) {
                    console.log(doc.data().date.toDate().toDateString())
                    await blogTemp.push({
                        ...blogTemp,
                        ...doc.data(),
                        id: doc.id
                    })
                    setBlogs(blogTemp)
                }
            });
            setLoading(1)
        }
        getBlogs('blog-news')
    }, [])


    const renderBlogs = blogs.map((blog) =>
        <div className='col-xl-3'>
            <MixedWidget5
                className='card-xl-stretch mb-5 mb-xl-8'
                image='/media/svg/brand-logos/vimeo.svg'
                //@ts-ignore
                time={String(blog.date.toDate().toDateString())}
                //@ts-ignore
                title={blog.title}
                //@ts-ignore
                description={blog.description}
                //@ts-ignore
                excerpt={blog.excerpt}
                category='blog-news'
            />
        </div>
    );



    return (
        <>
        <PageTitle breadcrumbs={[]}>Latest Blog Posts And News</PageTitle>
            <div className='row'>
                
                {
                    loading == 1 ?
                        renderBlogs : 
                        <div className="d-flex flex-column-fluid flex-center">
                                <CradleLoader
                                    // ariaLabel="loading-indicator"
                                    // height="150"
                                    // width="150"
                                    // color='#ef305e'
                                     />
                            </div>
                }
            </div>

        </>
    )
}

export { BlogNews }
