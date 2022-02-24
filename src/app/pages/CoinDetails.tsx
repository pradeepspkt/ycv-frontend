/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { app, db } from '../../firebase';
import {
    MixedWidget5,
} from '../../_metronic/partials/widgets'
import { PageTitle } from '../../_metronic/layout/core'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle, Triangle, CradleLoader } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    WhatsappShareButton,
    TwitterIcon,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    LinkedinShareButton,
    LinkedinIcon,
    ViberShareButton,
    ViberIcon
} from "react-share";

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
import { KTSVG } from '../../_metronic/helpers';


type Props = {
    className: string
    color: string
    svgIcon: string
    iconColor: string
    title: string
    description: string
}

const CoinDetails: React.FC<Props> = ({
    className,
    color,
    svgIcon,
    iconColor,
    title,
    description,
}) => {

    const [loading, setLoading] = useState(0);
    const [coinDetail, setDetail] = useState({});
    const [votingStatus, setVotingStatus] = useState(false);

    //@ts-ignore
    const { id } = useParams();

    useEffect(() => {
        getCoinDetail()
    }, [])

    const getCoinDetail = async () => {
        await fetch('https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/getCoinDetails?symbol='+id)
        .then(response => {
            return response.json()
        })
        .then(async (data) => {
            setDetail(data.ad)
        })
    }


    const submitVote = async() => {
        setVotingStatus(true)
        //@ts-ignore
        toast.success('Voting for  ' + coinDetail.symbol.toUpperCase() + ' is in progress!', {
            position: "bottom-right",
            icon: "🚀",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      
          //@ts-ignore
        await fetch('https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/addVote?symbol=' + coinDetail.symbol + '&docId=' + coinDetail.id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.success) {
                    toast.success('Vote successfull! Please submit your vote again tomorrow.', {
                        position: "bottom-right",
                        icon: "🚀",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.success('Try voting again tomorrow.', {
                        position: "bottom-right",
                        icon: "🚀",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            });
        await getCoinDetail()
        await setVotingStatus(false)
    }


    return (
        <>
            <PageTitle breadcrumbs={[]}>{id.toUpperCase()}  Vote your favorite coin!</PageTitle>
            <div className='row p-2'>
                <div className='card card-xl-stretch mb-5 mb-xl-8 col-xl-3 mx-xl-10 mt-5 mt-xl-0'>
                    <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
                        <div className='flex-grow-1'>
                            <div className='d-flex align-items-center pe-2 mb-8'>
                                <span className='text fw-bolder fs-6 flex-grow-1 m-1'>
                                    <div className='d-flex align-items-center'>
                                        <div className='symbol symbol-50px me-5'>
                                            <span className='symbol-label bg-light'>
                                                <img
                                                    //@ts-ignore
                                                    src={coinDetail.avatar}
                                                    className='h-75 align-self-end'
                                                    alt=''
                                                />
                                            </span>
                                        </div>
                                        <div className='d-flex justify-content-start flex-column mt-4'>
                                            <a  className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                                {
                                                    //@ts-ignore
                                                    id.toUpperCase()
                                                }
                                            </a>
                                            <span className='text-muted fw-bold text-muted d-block fs-7'>
                                                {
                                                    //@ts-ignore
                                                    coinDetail.name}
                                            </span>

                                        </div>

                                    </div>
                                    {/* {description} */}
                                </span>
                            </div>
                            <div className='d-flex justify-content-start flex-column'>
                                <a  className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Market Cap
                                </a>
                                <span className='text-muted fw-bold text-muted d-block fs-7'>

                                    {
                                        //@ts-ignore
                                        coinDetail.mCap == 0 ? '--' : '$' + Number(coinDetail.mCap).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                </span>

                            </div>
                            <div className='d-flex justify-content-start flex-column mt-3'>
                                <a  className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Status : <span className="badge badge-square badge-primary fs-6 p-3">
                                        {
                                        //@ts-ignore
                                        coinDetail.status}
                                    </span>
                                </a>


                            </div>
                            <div className='d-flex justify-content-start flex-column mt-3'>
                                <a  className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Network : <span className="text-muted fw-bold text-muted fs-7">
                                        {
                                        //@ts-ignore
                                        coinDetail.network ? coinDetail.network : 'NA'}
                                    </span>
                                </a>


                            </div>
                            <div className='d-flex justify-content-start flex-column mt-3'>
                                <a  className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Votes   { 
                                        //@ts-ignore
                                        coinDetail.vote && !votingStatus ?
                                        //@ts-ignore
                                        //@ts-ignore
                                        <div className="btn-group border border-success rounded" role="group" aria-label="Basic example">
                                          <button type="button" disabled className="btn btn-default btn-sm"><b>{
                                            //@ts-ignore
                                            coinDetail.votes}</b></button>
                                          <button type='submit' className='btn btn-sm btn-primary pl-2 pr-5' data-kt-menu-dismiss='true' onClick={() => {
                                            //@ts-ignore
                                            submitVote()
                                          }}>
                                            VOTE !
                                          </button>
                                        </div> 
                                        :
                                        <div className="btn-group border border-success rounded" role="group" aria-label="Basic example">
                                          <button type="button" disabled className="btn btn-default btn-sm"><b>{
                                            //@ts-ignore
                                            coinDetail.votes}</b></button>
                                          <button type='submit' disabled className='btn btn-sm btn-primary pl-2 pr-5' data-kt-menu-dismiss='true'>
                                            VOTED
                                          </button>
                                        </div> 
                                      }
                                      
                                      
                                </a>


                            </div>
                            <div className='d-flex justify-content-start flex-column mt-3'>
                                <a className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Share
                                    <div className='col-xl-12 mt-5'>

                                        <FacebookShareButton
                                            url={"https://www.yourcryptovoice.com/coin-details/" + id}
                                            quote={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                            hashtag={"#yourcryptovoice"}
                                        //@ts-ignore
                                        // className={{
                                        //     border: 5,
                                        // }}
                                        >
                                            <FacebookIcon size={36} />
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={"https://www.yourcryptovoice.com/coin-details/" + id}
                                            title={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                        // hashtag="#camperstribe"
                                        //  className={classes.socialMediaButton}
                                        >
                                            <TwitterIcon size={36} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton
                                            url={"https://www.yourcryptovoice.com/coin-details/" + id}
                                            title={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                            separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <WhatsappIcon size={36} />
                                        </WhatsappShareButton>
                                        <TelegramShareButton
                                            url={"https://www.yourcryptovoice.com/coin-details/" + id}
                                            title={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                        // separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <TelegramIcon size={36} />
                                        </TelegramShareButton>
                                        <LinkedinShareButton
                                            url={"https://www.yourcryptovoice.com/coin-details/" + id}
                                            title={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                        // separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <LinkedinIcon size={36} />
                                        </LinkedinShareButton>
                                        <ViberShareButton
                                            url={"http://www.yourcryptovoice.com/coin-details/" + id}
                                            title={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                        // separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <ViberIcon size={36} />
                                        </ViberShareButton>
                                    </div>
                                </a>

                            </div>
                        </div>
                        
                        
                    </div>
                </div>

                <div className='card card-xl-stretch  mb-xl-8 col-xl-8'>

                    <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
                        <div className='row'>

                            {/* <div className='col-xl-5'>
                                <a href={
                                    //@ts-ignore
                                    '/coin-details/aa'
                                } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    <span className="badge badge-square badge-primary fs-6 p-5">
                                        Chart Link
                                    </span>
                                </a>


                            </div> */}

                        </div>

                        <div className='flex-grow-1'>
                            <div className='col-xl-8 m-5'>
                                <a  className='text-dark fw-bolder text-hover-primary mb-1 m-2 '>
                                    Contract Address:
                                </a>

                                {
                                        //@ts-ignore
                                        coinDetail.contractAddress ? coinDetail.contractAddress : 'NA'}
                                {/* <KTSVG
                                    //@ts-ignore
                                    onClick={() => { navigator.clipboard.writeText('test') }}

                                    path='/media/icons/duotune/art/art005.svg'
                                    className='svg-icon-2x svg-icon-warning'
                                /> */}
                            </div>
                            <div className='col-xl-3 m-5'>

                            </div>
                            <div className='d-flex align-items-center pe-2 mb-5'>

                                <span className='text fw-bolder fs-6 flex-grow-1 m-5'>
                                {
                                        //@ts-ignore
                                        coinDetail.description}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <TablesWidget12 className='card-xxl-stretch mb-5 mb-xl-8' />

        </>
    )
}

export { CoinDetails }
