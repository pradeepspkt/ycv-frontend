/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../helpers'

type Props = {
  className: string
  time: string
  image: string
  title: string
  description: string
  category?: string
  excerpt?: string
  id?: string
}

const MixedWidget5: React.FC<Props> = ({
  className,
  time,
  image,
  title,
  description,
  category,
  excerpt,
  id,
}) => {
  return (
    <div className={`card ${className} shadow-lg h-300px`}>
      {/* begin::Body */}
      <div className='card-body d-flex flex-column pb-10 pb-lg-8'>
        <div className='flex-grow-1'>
          {/* begin::Info */}
          <div className='d-flex align-items-center pe-2 mb-5'>
            <span className='text-muted fw-bolder fs-5 flex-grow-1'>{time}</span>

            <div className='symbol symbol-50px'>
              <span className='symbol-label bg-light'>
                <img src={toAbsoluteUrl(image)} className='h-50 align-self-center' alt='' />
              </span>
            </div>
          </div>
          {/* end::Info */}

          {/* begin::Link */}
          <a className='text-dark fw-bolder text-hover-primary fs-5' href={"details/"+id}>
            {title}
          </a>
          {/* <Link
            to={{
              pathname: '/details/'+id,
              state: {
                title: title,
                description: description,
                category: category,
              },
            }}
            className='text-dark fw-bolder text-hover-primary fs-5'
          >
            {title}
          </Link> */}
          {/* <a href='#' className='text-dark fw-bolder text-hover-primary fs-4'>
            {title}
          </a> */}
          {/* end::Link */}

          {/* begin::Desc */}
          {/* <p className='py-3 text-muted' dangerouslySetInnerHTML={{__html: description.substr(0,250)+(250?'&hellip;':'')}}></p> */}
          {/* <p className='py-3 text-muted'>{excerpt.substr(0,250)+(250?'...':'')}</p> */}

          <p className='text-muted py-3'>{excerpt?.substring(0, 100)} ....</p>

          {/* end::Desc */}
        </div>

        {/* begin::Team */}
        {/* <div className='d-flex align-items-center'>
          <a
            href='#'
            className='symbol symbol-35px me-2'
            data-bs-toggle='tooltip'
            title='Ana Stone'
          >
            <img src={toAbsoluteUrl('/media/avatars/150-1.jpg')} alt='' />
          </a>

          <a
            href='#'
            className='symbol symbol-35px me-2'
            data-bs-toggle='tooltip'
            title='Mark Larson'
          >
            <img src={toAbsoluteUrl('/media/avatars/150-4.jpg')} alt='' />
          </a>

          <a
            href='#'
            className='symbol symbol-35px me-2'
            data-bs-toggle='tooltip'
            title='Sam Harris'
          >
            <img src={toAbsoluteUrl('/media/avatars/150-8.jpg')} alt='' />
          </a>
        </div> */}
        <div className='d-flex align-items-center'>
          <span className='text-muted fw-bolder fs-5 flex-grow-1'></span>

          <a className='' href={"details/"+id}>
            Read More
          </a>

          {/* <Link
            to={{
              pathname: '/details',
              state: {
                title: title,
                description: description,
                category: category,
              },
            }}
            className='text-right'
          >
            Read More
          </Link> */}
        </div>

        {/* <button className='btn btn-primary btn-sm'>Read More</button> */}
        {/* end::Team */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {MixedWidget5}
