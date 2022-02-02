/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { app, db } from '../../firebase';
import {
    MixedWidget5,
} from '../../_metronic/partials/widgets'
import { PageTitle } from '../../_metronic/layout/core'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle, Triangle, CradleLoader } from 'react-loader-spinner'
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
    const [blogs, setBlogs] = useState([]);

    //@ts-ignore
    const { id } = useParams();
    console.log(id)

    useEffect(() => {


        const getBlogs = async (category: string) => {
            setBlogs([])
            let blogTemp: any = []
            const querySnapshot = await getDocs(collection(db, "content"));
            querySnapshot.forEach(async (doc: any) => {
                if (doc.data().category == category) {
                    console.log(doc.data().date.toDate().toDateString())
                    await blogTemp.push({
                        ...blogTemp,
                        ...doc.data(),
                        id: doc.id
                    })
                    setBlogs(blogTemp)
                }
            });
            setLoading(1)
        }
        getBlogs('blog-news')
    }, [])


    // const renderBlogs = blogs.map((blog) =>
    //     <div className='col-xl-3'>
    //         <MixedWidget5
    //             className='card-xl-stretch mb-5 mb-xl-8'
    //             image='/media/svg/brand-logos/vimeo.svg'
    //             //@ts-ignore
    //             time={String(blog.date.toDate().toDateString())}
    //             //@ts-ignore
    //             title={blog.title}
    //             //@ts-ignore
    //             description={blog.description}
    //             //@ts-ignore
    //             excerpt={blog.excerpt}
    //             category='blog-news'
    //         />
    //     </div>
    // );



    return (
        <>
            <PageTitle breadcrumbs={[]}>{id.toUpperCase()}  Vote your favorite coin!</PageTitle>
            <div className='row'>
                <div className='card card-xl-stretch mb-5 mb-xl-8 col-xl-3 m-3'>
                    <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
                        <div className='flex-grow-1'>
                            <div className='d-flex align-items-center pe-2 mb-5'>
                                <span className='text fw-bolder fs-6 flex-grow-1 m-5'>
                                    <div className='d-flex align-items-center'>
                                        <div className='symbol symbol-50px me-5'>
                                            <span className='symbol-label bg-light'>
                                                <img
                                                    //@ts-ignore
                                                    src='https://storage.googleapis.com/coinsniper-assets/images/1yoi5dnPcxJlH7PAmmN7PyJ63OFgjV6taryVbcYE.png'
                                                    className='h-75 align-self-end'
                                                    alt=''
                                                />
                                            </span>
                                        </div>
                                        <div className='d-flex justify-content-start flex-column'>
                                            <a href={
                                                //@ts-ignore
                                                '/coin-details/aa'
                                            } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                                {
                                                    //@ts-ignore
                                                    id.toUpperCase()
                                                }
                                            </a>
                                            <span className='text-muted fw-bold text-muted d-block fs-7'>
                                                VeChain
                                            </span>

                                        </div>

                                    </div>
                                    {/* {description} */}
                                </span>
                            </div>
                            <div className='d-flex justify-content-start flex-column'>
                                <a href={
                                    //@ts-ignore
                                    '/coin-details/aa'
                                } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Market Cap
                                </a>
                                <span className='text-muted fw-bold text-muted d-block fs-7'>
                                    $874,548,214,210.00
                                </span>

                            </div>
                            <div className='d-flex justify-content-start flex-column mt-3'>
                                <a href={
                                    //@ts-ignore
                                    '/coin-details/aa'
                                } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Status : <span className="badge badge-square badge-primary fs-6 p-3">
                                        Promoted
                                    </span>
                                </a>


                            </div>
                            <div className='d-flex justify-content-start flex-column mt-3'>
                                <a href={
                                    //@ts-ignore
                                    '/coin-details/aa'
                                } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Network : <span className="text-muted fw-bold text-muted fs-7">
                                        BSC
                                    </span>
                                </a>


                            </div>
                            <div className='d-flex justify-content-start flex-column mt-3'>
                                <a href={
                                    //@ts-ignore
                                    '/coin-details/aa'
                                } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Votes : <span className="badge badge-square badge-success fs-6 p-3">
                                        65874
                                    </span>
                                </a>


                            </div>
                            <div className='d-flex justify-content-start flex-column mt-3'>
                                <a href={
                                    //@ts-ignore
                                    '/coin-details/aa'
                                } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Share
                                    <div className='col-xl-12 mt-5'>

                                        <FacebookShareButton
                                            url={"http://www.yourcryptovoice.com/coin-details/" + id}
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
                                            url={"http://www.yourcryptovoice.com/coin-details/" + id}
                                            title={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                        // hashtag="#camperstribe"
                                        //  className={classes.socialMediaButton}
                                        >
                                            <TwitterIcon size={36} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton
                                            url={"http://www.yourcryptovoice.com/coin-details/" + id}
                                            title={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                            separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <WhatsappIcon size={36} />
                                        </WhatsappShareButton>
                                        <TelegramShareButton
                                            url={"http://www.yourcryptovoice.com/coin-details/" + id}
                                            title={id.toUpperCase() + "- Your Crypto Voice, Vote your favorite coin today."}
                                        // separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <TelegramIcon size={36} />
                                        </TelegramShareButton>
                                        <LinkedinShareButton
                                            url={"http://www.yourcryptovoice.com/coin-details/" + id}
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

                <div className='card card-xl-stretch m-3 mb-xl-8 col-xl-8'>

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
                                <a href={
                                    //@ts-ignore
                                    '/coin-details/aa'
                                } className='text-dark fw-bolder text-hover-primary mb-1 '>
                                    Contract Address:
                                </a>

                                0x7B228294D3D5a3f29dFc877e73310CeEC9a84f2c
                                <KTSVG
                                //@ts-ignore
                                    onClick={() => { navigator.clipboard.writeText('test') }}

                                    path='/media/icons/duotune/art/art005.svg'
                                    className='svg-icon-2x svg-icon-warning'
                                />
                            </div>
                            <div className='col-xl-3 m-5'>

                            </div>
                            <div className='d-flex align-items-center pe-2 mb-5'>

                                <span className='text fw-bolder fs-6 flex-grow-1 m-5'>

                                    The Highest Returning Rewards Coin that Earns You Up To 15% Per Month. Just For Owning It…

                                    MetaGold Rewards is a new coin that provides a passive income stream to it’s holders…

                                    AN EASIER WAY TO REACH FINANCIAL FREEDOM…

                                    You earn passive income because of the fees on every transaction.
                                    These are: 14% on buys (11% rewards + 3% Liquidity Pool) and 19% on every sell (16% rewards + 3% Liquidity Pool). This means every time you check your wallet, you’re going to see more rewards in USDT.

                                    Because of the Binance Smart Chain system, you can rely on your USDT coins being delivered to you daily.

                                    MetaGold gives you the opportunity to achieve financial freedom, whatever that means to you: sitting on the beach or doing whatever it is you want! Especially as an early investor!
                                    {/* {description} */}
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
