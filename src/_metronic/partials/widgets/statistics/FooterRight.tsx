/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../helpers'

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  description: string
}

const FooterRight: React.FC<Props> = ({
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

        <div className={`text-inverse-white fw-bolder fs-2 mb-2 mt-5`}>View New Listings</div>

        <div className={`fw-bold text-inverse-white fs-7`}>Click the button below to view the New Listings!
These coins were just submitted.</div><br />
        <button className='btn btn-primary btn-sm mt-5'>View Listings</button>
      </div>
      {/* end::Body */}
    </a>
  )
}

export { FooterRight }
