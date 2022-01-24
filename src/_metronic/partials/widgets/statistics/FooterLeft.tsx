/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  description: string
}

const FooterLeft: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  description,
}) => {
  return (
    <a href='#' className={`card bg-${color} hoverable ${className}`}>
      {/* begin::Body */}
      {/* <div className='card-body'>
        <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} />

        <div className={`text-inverse-${color} fw-bolder fs-2 mb-2 mt-5`}>{title}</div>

        <div className={`fw-bold text-inverse-${color} fs-7`}>{description}</div>
      </div> */}
      <div className='card-body text-center card-xl-stretch'>

          <div className={`text-inverse-white fw-bolder fs-2 mb-2 mt-5`}>Your Favorite Coin Missing?</div>

          <div className={`fw-bold text-inverse-white fs-7`}>Can't find your coin? List your favorite coin now!
            </div>
            <br />
            <a
            href='#'
            className='btn btn-sm btn-primary btn-rounded btn-active-color-white'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            id='kt_toolbar_primary_button'
          >
            
            Submit Token
          </a>
          {/* <button className='btn btn-primary btn-sm mt-5'>Submit token</button> */}
        </div>
      {/* end::Body */}
    </a>
  )
}

export {FooterLeft}
