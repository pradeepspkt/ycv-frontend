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

const EducationalContent: React.FC<Props> = ({
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
        const getBlogs = async () => {
            let blogTemp: any = []
            fetch('https://us-central1-your-crypto-voice.cloudfunctions.net/getContent?category=educational')
            .then(response => {
                return response.json()
            })
            .then(async (data) => {
                const blogs = data.blogs
                blogs.forEach(async(blog:any)=>{
                    await blogTemp.push({
                        ...blogTemp,
                        ...blog,
                        id: blog.id
                    })
                })
                setBlogs(blogTemp)
            })
            setLoading(1)
        }
        getBlogs()
    }, [])


    const renderBlogs = blogs.map((blog) =>
        <div className='col-xl-3'>
            <MixedWidget5
                className='card-xl-stretch mb-5 mb-xl-8'
                image='/media/svg/brand-logos/vimeo.svg'
                //@ts-ignore
                time={String(blog.date)}
                //@ts-ignore
                title={blog.title}
                //@ts-ignore
                description={blog.description}
                category='educational'
                //@ts-ignore
                excerpt={blog.excerpt}
            />
        </div>
    );



    return (
        <>
            <PageTitle breadcrumbs={[]}>YCV Crypto Learning</PageTitle>

            <div className='row'>

                {
                    loading == 1 ?
                        renderBlogs :
                        <div>
                            {/* <BallTriangle
                                height="300"
                                width="300"
                                color="black"
                                arialLabel="loading-indicator"
                            /> */}
                            <div className="d-flex flex-column-fluid flex-center">
                                <CradleLoader
                                    // arialLabel="loading-indicator"
                                    // height="150"
                                    // width="150"
                                    // color='#ef305e'
                                     />
                            </div>

                        </div>


                }
            </div>

        </>
    )
}

export { EducationalContent }
