/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
// import {toAbsoluteUrl} from '../../../helpers'
import { useLocation } from 'react-router-dom'
// import htmlToDraft from 'html-to-draftjs';

type Props = {
    className: string
    time: string
    image: string
    title: string
    description: string,
    // category: string
}

const ContentDetail: React.FC<Props> = ({ className, time, image }) => {
    const location = useLocation()
    //@ts-ignore
    const { title, description, category } = location.state

    return (
        <div className='card card-xl-stretch mb-5 mb-xl-8'>
            {/* begin::Body */}
            <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
                <div className='xl-col-2'>

                    {
                        category == 'educational' ?
                            <Link to="/educational-content" className="btn btn-primary btn-sm">Go Back</Link>
                            :
                            <Link to="/blog-news" className="btn btn-primary btn-sm">Go Back</Link>
                    }
                </div>

                <div className='flex-grow-1'>
                    {/* begin::Info */}
                    <div className='d-flex align-items-center pe-2 mb-5'>
                        <span className='text fw-bolder fs-6 flex-grow-1 m-5'>
                            <br />
                            {title}< br />
                            <br />
          <p className='py-3 text-muted' dangerouslySetInnerHTML={{__html: description}}></p>

                            {/* {description} */}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ContentDetail }
