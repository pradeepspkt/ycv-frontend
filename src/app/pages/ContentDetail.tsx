/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
// import {toAbsoluteUrl} from '../../../helpers'
import {useLocation, useParams} from 'react-router-dom'
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
  ViberIcon,
} from 'react-share'
import {BallTriangle, Triangle, CradleLoader} from 'react-loader-spinner'
import {Helmet} from 'react-helmet'

type Props = {
  className: string
  time: string
  image: string
  title: string
  description: string
  // category: string
}

const ContentDetail: React.FC<Props> = ({className, time, image}) => {
  const location = useLocation()
  //@ts-ignore
  // const {title, description, category} = location.state

  const [detail, setDetail] = useState({})
  const [loading, setLoading] = useState(true)

  //@ts-ignore
  const {id} = useParams()

  useEffect(() => {
    getContentDetail()
  }, [])

  const getContentDetail = async () => {
    await setLoading(true)
    await fetch(
      'https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/getContentDetails?id=' + id
    )
      .then((response) => {
        return response.json()
      })
      .then(async (data) => {
        await setDetail(data.content)
      })
    await setLoading(false)
  }

  return (
    <div className='card card-xl-stretch mb-5 mb-xl-8'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {
            //@ts-ignore
            detail?.title
          }
        </title>
        <link rel='canonical' href={'http://yourcryptovoice.com/details/' + id} />
      </Helmet>
      {/* begin::Body */}
      <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
        <div className='xl-col-2'>
          {
            //@ts-ignore
            detail?.category == 'educational' ? (
              <Link to='/educational-content' className='btn btn-primary btn-sm'>
                Go Back
              </Link>
            ) : (
              <Link to='/blog-news' className='btn btn-primary btn-sm'>
                Go Back
              </Link>
            )
          }
        </div>

        <div className='flex-grow-1'>
          {/* begin::Info */}
          <div className='d-flex align-items-center pe-2 mb-0'>
            <span className='text fs-6 flex-grow-1 m-5'>
              <br />
              <span
                className='fw-bolder'
                style={{
                  textDecoration: 'underline',
                }}
              >
                {
                  //@ts-ignore
                  detail?.title
                }
              </span>
              <br />
              <br />
              <p
                className='py-2'
                dangerouslySetInnerHTML={
                  //@ts-ignore
                  {__html: detail?.description}
                }
              ></p>
              {/* {description} */}
            </span>
          </div>
        </div>
        <div className='d-flex justify-content-start flex-column mx-5'>
          <a
            className='text-dark fw-bolder text-hover-primary mb-1 fs-6'
            style={{
              textDecoration: 'underline',
            }}
          >
            Share
            <div className='col-xl-12 mt-5'>
              <FacebookShareButton
                url={'https://www.yourcryptovoice.com/details/' + id}
                title={
                  //@ts-ignore
                  detail?.title
                }
                hashtag={'#yourcryptovoice'}
                //@ts-ignore
                // className={{
                //     border: 5,
                // }}
              >
                <FacebookIcon size={36} />
              </FacebookShareButton>
              <TwitterShareButton
                url={'https://www.yourcryptovoice.com/details/' + id}
                title={
                  //@ts-ignore
                  detail?.title
                } // hashtag="#camperstribe"
                //  className={classes.socialMediaButton}
              >
                <TwitterIcon size={36} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={'https://www.yourcryptovoice.com/details/' + id}
                title={
                  //@ts-ignore
                  detail?.title
                }
                separator=':: '
                //  className={classes.socialMediaButton}
              >
                <WhatsappIcon size={36} />
              </WhatsappShareButton>
              <TelegramShareButton
                url={'https://www.yourcryptovoice.com/details/' + id}
                title={
                  //@ts-ignore
                  detail?.title
                } // separator=":: "
                //  className={classes.socialMediaButton}
              >
                <TelegramIcon size={36} />
              </TelegramShareButton>
              <LinkedinShareButton
                url={'https://www.yourcryptovoice.com/details/' + id}
                title={
                  //@ts-ignore
                  detail?.title
                } // separator=":: "
                //  className={classes.socialMediaButton}
              >
                <LinkedinIcon size={36} />
              </LinkedinShareButton>
              <ViberShareButton
                url={'https://www.yourcryptovoice.com/details/' + id}
                title={
                  //@ts-ignore
                  detail?.title
                } // separator=":: "
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

export {ContentDetail}
