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
import { BallTriangle, Triangle, CradleLoader } from 'react-loader-spinner'
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
    FooterRight
} from '../../_metronic/partials/widgets'


type Props = {
    className: string
    color: string
    svgIcon: string
    iconColor: string
    title: string
    description: string
}

const PromotedCoinsList: React.FC<Props> = ({
    className,
    color,
    svgIcon,
    iconColor,
    title,
    description,
}) => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>Want to promote your coin? Contact us!</PageTitle>
            <div className='row'>
                <TablesWidget12 className='card-xxl-stretch mb-5 mb-xl-8' hideViewAllButton={true} />
            </div>
        </>
    )
}

export { PromotedCoinsList }
