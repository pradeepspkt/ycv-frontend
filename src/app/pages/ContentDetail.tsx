/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
// import {toAbsoluteUrl} from '../../../helpers'
import { useLocation } from 'react-router-dom'
// import htmlToDraft from 'html-to-draftjs';
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
                <div className='d-flex justify-content-start flex-column mt-3'>
                                <a className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                                    Share
                                    <div className='col-xl-12 mt-5'>

                                        <FacebookShareButton
                                            url={"https://www.yourcryptovoice.com/blog-news/"}
                                            title={"Your Crypto Voice, Vote your favorite coin today."}
                                            hashtag={"#yourcryptovoice"}
                                        //@ts-ignore
                                        // className={{
                                        //     border: 5,
                                        // }}
                                        >
                                            <FacebookIcon size={36} />
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={"https://www.yourcryptovoice.com/blog-news/"}
                                            title={"Your Crypto Voice, Vote your favorite coin today."}
                                        // hashtag="#camperstribe"
                                        //  className={classes.socialMediaButton}
                                        >
                                            <TwitterIcon size={36} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton
                                            url={"https://www.yourcryptovoice.com/blog-news/"}
                                            title={"Your Crypto Voice, Vote your favorite coin today."}
                                            separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <WhatsappIcon size={36} />
                                        </WhatsappShareButton>
                                        <TelegramShareButton
                                            url={"https://www.yourcryptovoice.com/blog-news/"}
                                            title={"Your Crypto Voice, Vote your favorite coin today."}
                                        // separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <TelegramIcon size={36} />
                                        </TelegramShareButton>
                                        <LinkedinShareButton
                                            url={"https://www.yourcryptovoice.com/blog-news/"}
                                            title={"Your Crypto Voice, Vote your favorite coin today."}
                                        // separator=":: "
                                        //  className={classes.socialMediaButton}
                                        >
                                            <LinkedinIcon size={36} />
                                        </LinkedinShareButton>
                                        <ViberShareButton
                                            url={"https://www.yourcryptovoice.com/blog-news/"}
                                            title={"Your Crypto Voice, Vote your favorite coin today."}
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
    )
}

export { ContentDetail }
