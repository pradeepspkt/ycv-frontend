/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'

const Toolbar1: FC = () => {
  const {classes} = useLayout()

  return (
    <div className='toolbar py-5 py-lg-15' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        {/* begin::Actions */}
        <div className='d-flex align-items-center py-1'>
          {/* begin::Wrapper */}
          {/* <div className='me-4'>
            <a
              href='#'
              className='btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTSVG
                path='/media/icons/duotune/general/gen031.svg'
                className='svg-icon-5 svg-icon-gray-500 me-1'
              />
              Filter
            </a>

          </div> */}
          {/* end::Wrapper */}

          {/* begin::Button */}
          {/* <div className='d-flex justify-content-end flex-shrink-0'>
                  <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTE
                  </button>
                  </div> */}
{/* <a href="#" type='submit' className="btn btn-primary"><i className="bi bi-chat-square-text-fill fs-4 me-2" data-kt-menu-dismiss='true'></i> Caption</a> */}
          <a
            href='#'
            className='btn btn-primary btn-rounded btn-active-color-white'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
            id='kt_toolbar_primary_button'
          ><i className="bi bi-file-earmark-plus fs-2x fs-4 me-2" data-kt-menu-dismiss='true'></i>
            
            Submit Token
          </a>
          {/* end::Button */}
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar1}
