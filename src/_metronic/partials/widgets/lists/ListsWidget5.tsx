/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
}

const ListsWidget5: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-4'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder mb-2 text-dark'>Roadmap</span>
          <span className='text-muted fw-bold fs-7'>Our future plans</span>
        </h3>
      
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-5'>
        {/* begin::Timeline */}
        <div className='timeline-label'>
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>1</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-success fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className='timeline-content d-flex'>
              <span className='fw-bolder text-gray-800 ps-4'>
                <span className=''>Phase 1 (LIVE Now)</span> <br/><br/>
                <i className='fa fa-genderless text-success'></i> Active Social Media Presence on every platforms.<br/><br/>
                <i className='fa fa-genderless text-success'></i> Launch of YCV fully functionable website with token listing and voting.<br/><br/>
                <i className='fa fa-genderless text-success'></i> Global Advertisement of YCV platform along with some major sponsors in big platforms.<br/>
              </span>
            </div>

            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>2</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-primary fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Content */}
            <div className='timeline-content d-flex'>
            <span className='fw-bolder text-gray-800 ps-4'>
                <span className=''>Phase 2</span> <br/><br/>
                <i className='fa fa-genderless text-primary'></i> Membership sign up only through chat platforms available via all the YCV platforms and get free YCV dollars as benefit and bonus.<br/><br/>
                <i className='fa fa-genderless text-primary'></i> Invite friends and earn 50% of all their rewards - including new member bonus and downstream invites.<br/>
              </span>
            </div>
            {/* end::Content */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>3</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className='timeline-content d-flex'>
              <span className='fw-bolder text-gray-800 ps-4'>
              <span className=''>Phase 3</span> <br/><br/>
              <i className='fa fa-genderless text-danger'></i> YCV whitepaper release and public sale of YCV dollars. Price of YCV will be adjusted accordingly.<br/><br/>
              <i className='fa fa-genderless text-danger'></i> Launch YCV token for the public, with listing in many platforms like coin market cap, coingecko and other exchanges.<br/><br/>
              <i className='fa fa-genderless text-danger'></i> Host crypto events quarterly.<br/>

              </span>
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>4</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className='timeline-content d-flex'>
            <span className='fw-bolder text-gray-800 ps-4'>
            <span className=''>Phase 4</span> <br/><br/>
            <i className='fa fa-genderless text-danger'></i> Build an mobile app and web based app for the project, which enables long term deposit of YCV dollars and YCV tokens, along with other cryptocurrencies for daily yield payments.<br/><br/>
            <i className='fa fa-genderless text-danger'></i> Earn yield on money deposited in Earning. <br/>

            </span>
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>5</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Desc */}
            <div className='timeline-content d-flex'>
            <span className='fw-bolder text-gray-800 ps-4'>
            <span className=''>Phase 5</span> <br/><br/>
            <i className='fa fa-genderless text-danger'></i> Launch virtual debit card for online and offline payments on major online commodities which supports YCV tokens as payment. <br/>
            <i className='fa fa-genderless text-danger'></i> Integrate with digital wallets like apple pay, google pay and samsung pay. <br/>

            </span>
            </div>
            {/* end::Desc */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
          <div className='timeline-item'>
            {/* begin::Label */}
            <div className='timeline-label fw-bolder text-gray-800 fs-6'>6</div>
            {/* end::Label */}
            {/* begin::Badge */}
            <div className='timeline-badge'>
              <i className='fa fa-genderless text-danger fs-1'></i>
            </div>
            {/* end::Badge */}
            {/* begin::Text */}
            <div className='timeline-content d-flex'>
            <span className='fw-bolder text-gray-800 ps-4'>
            <span className=''>Phase 6</span> <br/><br/>
            <i className='fa fa-genderless text-danger'></i> YCV EcoSystem  <br/><br/>
            </span>
            </div>
            {/* end::Text */}
          </div>
          {/* end::Item */}
          {/* begin::Item */}
        
          {/* end::Item */}
        </div>
        {/* end::Timeline */}
      </div>
      {/* end: Card Body */}
    </div>
  )
}

export {ListsWidget5}
