/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'

type Props = {
  className: string
}

const TablesWidget10: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>All Tokens</span>
          <span className='text-muted mt-1 fw-bold fs-7'>Vote your favorite token</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <a
            href='#'
            className='btn btn-sm btn-light-primary'
          // data-bs-toggle='modal'
          // data-bs-target='#kt_modal_invite_friends'
          >
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            View All
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-rounded table-striped border gy-2 gs-5 table-hover'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'>
                
                <th className='min-w-150px'>Name</th>
                <th className='min-w-140px'>Chain</th>
                <th className='min-w-100px'>Market Cap</th>
                <th className='min-w-100px'>Price</th>
                <th className='min-w-100px'>Votes</th>
                <th className='min-w-100px text-end'>Action</th>

              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/16444.png' alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        MetaFootball
                      </a>
                      <span className='text-muted  fw-bold d-block fs-7'>
                        MTF
                      </span>
                    </div>
                  </div>
                </td>
                <td>

                  <span className='fw-bold d-block fs-7'>
                    BSC
                  </span>
                </td>
                <td>
                  <span className='fw-bold d-block fs-7'>
                    $559,745,210
                  </span>
                </td>
                <td>
                  <div className='d-flex justify-content-start flex-shrink-0'>
                    <span className='fw-bold d-block fs-7'>
                      0.00578$
                    </span>

                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-start flex-shrink-0'>
                <span className="badge badge-square badge-success fs-6 p-3">4200</span>
                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png' alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        Shiba Inu
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>
                        SHIB
                      </span>
                    </div>
                  </div>
                </td>
                <td>

                  <span className='fw-bold d-block fs-7'>
                    BSC
                  </span>
                </td>
                <td>
                  <span className='fw-bold d-block fs-7'>
                    $58,254,000
                  </span>
                </td>
                <td>
                  <div className='d-flex justify-content-start flex-shrink-0'>
                    <span className='fw-bold d-block fs-7'>
                      2.12$
                    </span>

                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-start flex-shrink-0'>
                <span className="badge badge-square badge-success fs-6 p-3">5</span>
                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/14911.png' alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        MetaDoge
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>
                        METADOGE
                      </span>
                    </div>
                  </div>
                </td>
                <td>

                  <span className='fw-bold d-block fs-7'>
                    BSC
                  </span>
                </td>
                <td>
                  <span className='fw-bold d-block fs-7'>
                    $559,745,210
                  </span>
                </td>
                <td>
                  <div className='d-flex justify-content-start flex-shrink-0'>
                    <span className='fw-bold d-block fs-7'>
                      0.00578$
                    </span>

                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-start flex-shrink-0'>
                <span className="badge badge-square badge-success fs-6 p-3">145</span>
                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/16444.png' alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        DogeRun
                      </a>
                      <span className='text-muted  fw-bold d-block fs-7'>
                        DRUN
                      </span>
                    </div>
                  </div>
                </td>
                <td>

                  <span className='fw-bold d-block fs-7'>
                    BSC
                  </span>
                </td>
                <td>
                  <span className='fw-bold d-block fs-7'>
                    $559,745,210
                  </span>
                </td>
                <td>
                  <div className='d-flex justify-content-start flex-shrink-0'>
                    <span className='fw-bold d-block fs-7'>
                      0.00578$
                    </span>

                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-start flex-shrink-0'>
                <span className="badge badge-square badge-success fs-6 p-3">8974</span>
                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/14490.png' alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        Bit Hotel
                      </a>
                      <span className='text-muted  fw-bold d-block fs-7'>
                        BTH
                      </span>
                    </div>
                  </div>
                </td>
                <td>

                  <span className='fw-bold d-block fs-7'>
                    BSC
                  </span>
                </td>
                <td>
                  <span className='fw-bold d-block fs-7'>
                    $559,745,210
                  </span>
                </td>
                <td>
                  <div className='d-flex justify-content-start flex-shrink-0'>
                    <span className='fw-bold d-block fs-7'>
                      0.00578$
                    </span>

                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-start flex-shrink-0'>
                <span className="badge badge-square badge-success fs-6 p-3">41</span>
                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('/media/svg/avatars/001-boy.svg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        HalfPizza
                      </a>
                      <span className='text-muted  fw-bold d-block fs-7'>
                        PIZA
                      </span>
                    </div>
                  </div>
                </td>
                <td>

                  <span className='fw-bold d-block fs-7'>
                    BSC
                  </span>
                </td>
                <td>
                  <span className='fw-bold d-block fs-7'>
                    $559,745,210
                  </span>
                </td>
                <td>
                  <div className='d-flex justify-content-start flex-shrink-0'>
                    <span className='fw-bold d-block fs-7'>
                      0.00578$
                    </span>

                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-start flex-shrink-0'>
                <span className="badge badge-square badge-success fs-6 p-3">8745</span>
                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/11079.png' alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        BitGert
                      </a>
                      <span className='text-muted fw-bold d-block fs-7'>
                        BRISE
                      </span>
                    </div>
                  </div>
                </td>
                <td>

                  <span className='fw-bold d-block fs-7'>
                    BSC
                  </span>
                </td>
                <td>
                  <span className='fw-bold d-block fs-7'>
                    $559,745,210
                  </span>
                </td>
                <td>
                  <div className='d-flex justify-content-start flex-shrink-0'>
                    <span className='fw-bold d-block fs-7'>
                      0.00578$
                    </span>

                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-start flex-shrink-0'>
                <span className="badge badge-square badge-success fs-6 p-3">1</span>
                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div>
                </td>
              </tr>
              <tr>
                
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src='https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png' alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        Solana
                      </a>
                      <span className='text-muted  fw-bold d-block fs-7'>
                        SOL
                      </span>
                    </div>
                  </div>
                </td>
                <td>

                  <span className='fw-bold d-block fs-7'>
                    BSC
                  </span>
                </td>
                <td>
                  <span className='fw-bold d-block fs-7'>
                    $559,745,210
                  </span>
                </td>
                <td>
                  <div className='d-flex justify-content-start flex-shrink-0'>
                    <span className='fw-bold d-block fs-7'>
                      0.00578$
                    </span>

                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-start flex-shrink-0'>
                <span className="badge badge-square badge-success fs-6 p-3">874</span>
                  </div>
                </td>
                <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div>
                </td>
              </tr>
              {/* <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('/media/avatars/150-3.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        Jessie Clarcson
                      </a>
                      <span className='fw-bold d-block fs-7'>
                        C#, ASP.NET, MS SQL
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                    Agoda
                  </a>
                  <span className='fw-bold d-block fs-7'>
                    Houses &amp; Hotels
                  </span>
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-bold'>70%</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-danger'
                        role='progressbar'
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('/media/avatars/150-4.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        Lebron Wayde
                      </a>
                      <span className='fw-bold d-block fs-7'>
                        PHP, Laravel, VueJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                    RoadGee
                  </a>
                  <span className='fw-bold d-block fs-7'>Transportation</span>
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-bold'>60%</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-success'
                        role='progressbar'
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('/media/avatars/150-5.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        Natali Goodwin
                      </a>
                      <span className='fw-bold d-block fs-7'>
                        Python, PostgreSQL, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                    The Hill
                  </a>
                  <span className='fw-bold d-block fs-7'>Insurance</span>
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-bold'>50%</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-warning'
                        role='progressbar'
                        style={{ width: '50%' }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5'>
                      <img src={toAbsoluteUrl('/media/avatars/150-6.jpg')} alt='' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary fs-6'>
                        Kevin Leonard
                      </a>
                      <span className='fw-bold d-block fs-7'>
                        HTML, JS, ReactJS
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                    RoadGee
                  </a>
                  <span className='fw-bold d-block fs-7'>Art Director</span>
                </td>
                <td className='text-end'>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-bold'>90%</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className='progress-bar bg-info'
                        role='progressbar'
                        style={{ width: '90%' }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex justify-content-end flex-shrink-0'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </div>
                </td>
              </tr> */}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export { TablesWidget10 }
