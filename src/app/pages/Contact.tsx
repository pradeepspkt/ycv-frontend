/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {useState, useEffect} from 'react'
import {collection, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {app, db} from '../../firebase'
import {MixedWidget5} from '../../_metronic/partials/widgets'
import {PageTitle} from '../../_metronic/layout/core'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BallTriangle, Triangle, CradleLoader} from 'react-loader-spinner'
import {
  MixedWidget2,
  MixedWidget10,
  MixedWidget11,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  TablesWidget5,
  TablesWidget6,
  TablesWidget10,
  TablesWidget12,
  MixedWidget8,
  StatisticsWidget5,
  StatisticsWidget7,
  FooterLeft,
  FooterRight,
} from '../../_metronic/partials/widgets'

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  description: string
}

const Contact: React.FC<Props> = ({className, color, svgIcon, iconColor, title, description}) => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Contact Us</PageTitle>
      <div className='row'>
        <div className='card card-xl-stretch mb-5 mb-xl-8 col-xl-12 m-3'>
          <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
            <div className='flex-grow-1 mt-20'>
              <div className='d-flex align-items-center pe-2 mb-8'>
                <span className='text-center fw-bolder fs-2 flex-grow-1 m-1'>Advertising</span>
              </div>
              <div className='d-flex align-items-center pe-2 mb-15'>
                <span className='text-center fw-bolder fs-6 flex-grow-1 m-1'>
                  We offer Banner Ad spots. For prices and information, please email us at:
                  <a href='mailto:advertisement@yourcryptovoice.com'>
                    {' '}
                    advertisement@yourcryptovoice.com
                  </a>
                </span>
              </div>
              <div className='d-flex align-items-center pe-2 mb-8'>
                <span className='text-center fw-bolder fs-2 flex-grow-1 m-1'>
                  General Inquiries
                </span>
              </div>
              <div className='d-flex align-items-center pe-2 mb-8'>
                <span className='text-center fw-bolder fs-6 flex-grow-1 m-1 mb-15'>
                  To ask anything else email us at:
                  <a href='mailto:contact@yourcryptovoice.com'> contact@yourcryptovoice.com</a>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' hideViewAllButton={true} /> */}
      </div>
    </>
  )
}

export {Contact}
