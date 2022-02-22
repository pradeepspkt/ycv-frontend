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

const TermsConditions: React.FC<Props> = ({
  className,
  color,
  svgIcon,
  iconColor,
  title,
  description,
}) => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Contact Us</PageTitle>
      <div className='row'>
        <div className='card card-xl-stretch mb-5 mb-xl-8 col-xl-12 m-3'>
          <div className='card-body d-flex flex-column pb-10 pb-lg-15'>
            <div className='flex-grow-1 mt-15'>
              <div className='d-flex align-items-center pe-2 mb-8'>
                <span className='text-center fw-bolder fs-2 flex-grow-1 m-1' style={{
                  textDecoration: "underline"
                }}>
                  Terms and Conditions
                </span>
              </div>

              <div className='d-flex align-items-center pe-2 mb-8'>
                <span className='fs-6 flex-grow-1 m-1 mb-15'>
                  <h5 className='text-center' style={{
                    textDecoration: "underline"
                  }}>Introduction</h5> <br />
                  <span >This website provides several
                  tools to know more about Crypto. We are not financial advisors but we present our
                  report with all the community engagement. We continuously try to block all the
                  fake and spam votes but sometimes the voting might not be 100% correct. ALWAYS do
                  your own research (DYOR), you are responsible for your own investments.</span>
                  
                  <br />
                  <br />
                  <span>
                 Even when a crypto seems safe
                  because of honeypot checks, audits, scans etc, it can turn out to be a scam. Take
                  your time to understand what you are investing into. The sponsored tokens or
                  Cryptos are shown in the sectors because it has been paid and we try our best to
                  not list the token which we feel unsafe to our investors but your own research is
                  very important.
                  </span>
                  <br />
                  <br /><br/>
                 <h5 style={{
                    textDecoration: "underline"
                  }}> Listing on Your crypto voice</h5>
                  <br />
                  
                  <i className='fa fa-genderless text-primary mx-2'></i> Any Crypto project can apply on
                  our website to get listed. We check the validity of this information and list it
                  on the website.
                  <br />
                  <br />
                  <i className='fa fa-genderless text-primary mx-2'></i> Your Crypto Voice reserves the
                  right to delete or unlist if we find it illegitimate. We request our user to email
                  us at <a href="mailto:info@yourcryptovoice.com">info@yourcryptovoice.com</a> if you find any misleading information. We will try
                  to get back to you ASAP.
                  <br /><br/><br/>
                  <h5 style={{
                    textDecoration: "underline"
                  }}>Intellectual Property Rights</h5>
                  <br />
                  <i className='fa fa-genderless text-primary mx-2'></i> You are granted a limited
                  license only for purposes of viewing the material contained on this website.
                  <br />
                  <br />
                  <br />
                  <h5 style={{
                    textDecoration: "underline"
                  }}>Restrictions</h5>
                  <br /> You are restricted from all of the following:
                  <br />
                  <br />
                  <i className='fa fa-genderless text-primary mx-5'></i> Using bots for visits, automatic
                  voting or other actions on these websites.
                  <br />
                  <br />
                  <i className='fa fa-genderless text-primary mx-5'></i> Publishing materials of this
                  website, in any other media without permission.
                  <br />
                  <br />
                  <i className='fa fa-genderless text-primary mx-5'></i> Using this website in any way,
                  that impacts user access to this Website.
                  <br />
                  <br />
                  <i className='fa fa-genderless text-primary mx-5'></i> Using this website contrary to
                  applicable laws and regulations, or in any way may cause harm to the website.

                  <br/><br/><br/><br/>
                 <h5 style={{
                    textDecoration: "underline"
                  }}> Links to other website</h5>
                  <br />
                  <i className='fa fa-genderless text-primary mx-2'></i> Our service may contain links to
                  third-party web sites or services that are not owned or controlled by the Company.
                  <br />
                  <br />
                  <i className='fa fa-genderless text-primary mx-2'></i> Your crypto voice has no control
                  over, and assumes no responsibility for, the content, privacy policies, or
                  practices of any third party web sites or services. We won’t be responsible for
                  any loss caused or alleged to be caused by in or connection with the linkage of
                  this website.
                  <br />
                  <br />
                  <i className='fa fa-genderless text-primary mx-2'></i> We strongly recommend you to
                  read terms and conditions and privacy policies of any third-party web sites or
                  services that you visit.
                  <br />
                  <br />
                  <br />
                  <br />
                   
                  <h5 style={{
                    textDecoration: "underline"
                  }}> Termination</h5><br/>
                  <i className='fa fa-genderless text-primary mx-2'></i> We may terminate or suspend your access immediately, without prior
                  notice or liability, for any reason whatsoever. If you think this is by mistake
                  feel free to email us at info@yourcryptovoice.com and we shall review your request
                  with ease.
                  <br />
                  <br />
                  <br />
                  <br />
                  <h5 style={{
                    textDecoration: "underline"
                  }}>Promotions</h5> 
                  <br/>
                  <span  style={{
                    textDecoration: "underline"
                  }}>Paid Promotions </span> <br/><i className='fa fa-genderless text-primary mx-4 mt-5'></i>  Any coin can be listed in the top promoted section.
                  <br/><i className='fa fa-genderless text-primary mx-4 '></i>These are paid promotions.
                  <br/><i className='fa fa-genderless text-primary mx-4 '></i> These are not any verified coins.
                  <br/><i className='fa fa-genderless text-primary mx-4 '></i> If we have a report
                  of rug pulling or scamming we reserve the right to delist these coins as soon as
                  we see any evidence supporting this.
                  <br/><br/>
                  <span  style={{
                    textDecoration: "underline"
                  }}>Note: </span>
                   <br/>
                   <i className='fa fa-genderless text-primary mx-4 mt-5'></i>  We will try our best to find the real
                  project but always do your own research before investing in any of these tokens.
                  <br/><i className='fa fa-genderless text-primary mx-4'></i>All Tokens / Vote your favorite token This section will list all the submitted
                  coins which fulfill our requirements. 
                  <br/><i className='fa fa-genderless text-primary mx-4'></i>All the users can vote for their favorite
                  coins, the coin with maximum votes will always be on the top and accordingly.
                  <br/><br/>
                   All
                  the coins are clickable and contain all the information regarding coins which are
                  provided by the coin submitters.
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

export {TermsConditions}
