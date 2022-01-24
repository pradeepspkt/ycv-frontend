/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../helpers'
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, query, orderBy, startAfter, limit, setDoc } from "firebase/firestore";
import { app, db } from '../../../../firebase';

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  description: string
}

const StatisticsWidget5: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  description,
}) => {

  const [ad, setAd] = useState('');

  useEffect(() => {
    loadAd()
  }, [])

  const loadAd = async () => {
    const docRef = doc(db, "advertisement", '1mlrnYbLaptRLj6vCDoK');
    const docSnap = await getDoc(docRef);
    let image: any = ''
    if (docSnap.exists()) {
      //@ts-ignore
      // await setAd(docSnap.data())
      image = docSnap.data()
      await setAd(image)
    }
  }

  return (
    <>
      {
        ad ?
        //@ts-ignore
        <a href={ad.adLink} className={`card bg-${color} hoverable ${className} border border-gray-100`} target='_blank'>
        {/* begin::Body */}
        <img
        //@ts-ignore
                            src={ad.image}
                            height='100px'
                            width='100%'
                            className='h-150px align-self-end'
                            alt=''
                          />
        {/* <div className='card-body'>
       
       
        </div> */}
        {/* end::Body */}
      </a>
          :
          null
      }

    </>
    // <a href='#' className={`card bg-${color} hoverable ${className}`}>
    //   {/* begin::Body */}
    //   <div className='card-body'>
    //     <KTSVG path={svgIcon} className={`svg-icon-${iconColor} svg-icon-3x ms-n1`} />

    //     <div className={`text-inverse-${color} fw-bolder fs-2 mb-2 mt-5`}>{title}</div>

    //     <div className={`fw-bold text-inverse-${color} fs-7`}>{description}</div>
    //   </div>
    //   {/* end::Body */}
    // </a>
  )
}

export { StatisticsWidget5 }
