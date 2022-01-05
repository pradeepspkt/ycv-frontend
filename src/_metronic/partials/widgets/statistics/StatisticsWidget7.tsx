/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  description: string
}

const StatisticsWidget7: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  description,
}) => {
  return (
    <a href='#' className={`card bg-${color} hoverable ${className} border border-gray-300`}>
      {/* begin::Body */}
      <img
                          src={toAbsoluteUrl('/media/banner/side-gif.gif')}
                          height='100px'
                          width='100%'
                          className='h-150px align-self-end'
                          alt=''
                        />
      {/* <div className='card-body'>
     
     
      </div> */}
      {/* end::Body */}
    </a>
  )
}

export {StatisticsWidget7}
