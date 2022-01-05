/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'

type Props = {
  className: string
}

const TablesWidget12: React.FC<Props> = ({ className }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Promoted</span>
          <span className='text-muted mt-1 fw-bold fs-7'>Tokens we recommend</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          {/* begin::Menu 2 */}
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold w-200px'
            data-kt-menu='true'
          >
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content fs-6 text-dark fw-bolder px-3 py-4'>Quick Actions</div>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mb-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Ticket
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Customer
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div
              className='menu-item px-3'
              data-kt-menu-trigger='hover'
              data-kt-menu-placement='right-start'
              data-kt-menu-flip='left-start, top'
            >
              {/* begin::Menu item */}
              <a href='#' className='menu-link px-3'>
                <span className='menu-title'>New Group</span>
                <span className='menu-arrow'></span>
              </a>
              {/* end::Menu item */}
              {/* begin::Menu sub */}
              <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Admin Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Staff Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Member Group
                  </a>
                </div>
                {/* end::Menu item */}
              </div>
              {/* end::Menu sub */}
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Contact
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mt-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content px-3 py-3'>
                <a className='btn btn-primary btn-sm px-4' href='#'>
                  Generate Reports
                </a>
              </div>
            </div>
            {/* end::Menu item */}
          </div>
          {/* end::Menu 2 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-2'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='ps-4 min-w-200px rounded-start'>Name</th>
                <th className='min-w-125px'>Price</th>
                <th className='min-w-200px'>Market Cap</th>
                <th className='min-w-150px'>Votes</th>
                <th className='min-w-80px rounded-end'>Action</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src='https://s2.coinmarketcap.com/static/img/coins/64x64/14911.png'
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        MetaDoge
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        METADOGE
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    0.0087$
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>$0.0...02877</span>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  $308,236,260
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>--</span>
                </td>
                <td><span className="badge badge-square badge-success fs-6 p-3">4200</span></td>
                <td>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src='https://s2.coinmarketcap.com/static/img/coins/64x64/16426.png'
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        DogeRun
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        DOGERUN
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    0.0087$
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>0.0087$</span>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  $308,236,260
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>$3,266,608</span>
                </td>
                <td><span className="badge badge-square badge-success fs-6 p-3">2897</span></td>
                {/* <td>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                </td> */}

                <td>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                  >
                    VOTED
                  </a>

                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src='https://s2.coinmarketcap.com/static/img/coins/64x64/15985.png'
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Moongoose
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        MOONGOOSE
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    0.0087$
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>0.0087$</span>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  $308,236,260
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>$48,709,569

                  </span>
                </td>
                <td><span className="badge badge-square badge-success fs-6 p-3">5</span></td>
                <td>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                </td>

              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src='https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png'
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        MetaDoge
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        METADOGE
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    0.0087$
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>0.0087$</span>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  $308,236,260
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>$308,236,260</span>
                </td>
                <td><span className="badge badge-square badge-success fs-6 p-3">231</span></td>
                <td>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src='https://s2.coinmarketcap.com/static/img/coins/64x64/10586.png'
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        Taboo Token
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        TABOO
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    0.0087$
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>$0.01146	</span>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  $308,236,260
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>$112,121,649

                  </span>
                </td>
                <td><span className="badge badge-square badge-success fs-6 p-3">2504</span></td>
                <td>
                  <a
                    href='#'
                    className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 me-2'
                  >
                    VOTED
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <span className='symbol-label bg-light'>
                        <img
                          src='https://s2.coinmarketcap.com/static/img/coins/64x64/16500.png'
                          className='h-75 align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                        ShibaDoge
                      </a>
                      <span className='text-muted fw-bold text-muted d-block fs-7'>
                        SHIBDOGE
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    0.0087$
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>0.0087$</span>
                </td>
                <td>
                  {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                  $308,236,260
                  </a> */}
                  <span className='text-dark fw-bold text-dark d-block fs-7'>--</span>
                </td>
                <td><span className="badge badge-square badge-success fs-6 p-3">28097</span></td>
                <td>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                </td>

              </tr>

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

export { TablesWidget12 }
