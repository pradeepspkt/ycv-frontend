import clsx from 'clsx'
import React, { FC } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { HeaderNotificationsMenu, HeaderUserMenu, QuickLinks, Search } from '../../../partials'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'

const Topbar: FC = () => {
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className='topbar d-flex align-items-stretch flex-shrink-0'>
        {/* Search */}
        <div className={clsx('d-flex align-items-stretch', toolbarButtonMarginClass)}>
          <Search />
        </div>

        {/* Activities */}
        <div className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}>
          {/* begin::Drawer toggle */}
          <a href='#' className='btn btn-icon btn-light-facebook btn-sm'>
            <i className='bi bi-facebook fs-2'></i>
          </a>
          {/* <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            id='kt_activities_toggle'
          >
            
            <KTSVG
              path='/media/icons/duotune/general/gen032.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div> */}
          {/* end::Drawer toggle */}
        </div>
        <div className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}>
          {/* begin::Drawer toggle */}
          <a href='#' className='btn btn-icon btn-light-facebook btn-sm'>
            <i className='bi bi-instagram fs-2'></i>
          </a>
          {/* <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            id='kt_activities_toggle'
          >
            
            <KTSVG
              path='/media/icons/duotune/general/gen032.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div> */}
          {/* end::Drawer toggle */}
        </div>
        <div className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}>
          {/* begin::Drawer toggle */}
          
          <a href='#' className='btn btn-icon btn-light-twitter btn-sm me-3'>
            <i className='bi bi-twitter fs-2'></i>
          </a>
         
          {/* <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            id='kt_activities_toggle'
          >
            
            <KTSVG
              path='/media/icons/duotune/general/gen032.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div> */}
          {/* end::Drawer toggle */}
        </div>
        <div className={clsx('d-flex align-items-center ', toolbarButtonMarginClass)}>
          {/* begin::Drawer toggle */}
          <a href='#' className='btn btn-icon btn-light-twitter btn-sm me-1'>
            <i className='bi bi-linkedin fs-2'></i>
          </a>
         
          {/* <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            id='kt_activities_toggle'
          >
            
            <KTSVG
              path='/media/icons/duotune/general/gen032.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div> */}
          {/* end::Drawer toggle */}
        </div>
        {/* Quick links */}
        {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen025.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div>
          <QuickLinks />
        </div> */}

        {/* CHAT */}
        {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            id='kt_drawer_chat_toggle'
          >
            <KTSVG
              path='/media/icons/duotune/communication/com012.svg'
              className={toolbarButtonIconSizeClass}
            />

            <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
          </div>
        </div> */}

        {/* NOTIFICATIONS */}
        {/* <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
          <div
            className={clsx(
              'btn btn-icon btn-active-light-primary position-relative',
              toolbarButtonHeightClass
            )}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen022.svg'
              className={toolbarButtonIconSizeClass}
            />
          </div>
          <HeaderNotificationsMenu />
        </div> */}

        {/* begin::User */}
        {/* <div
          className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
          id='kt_header_user_menu_toggle'
        >
          <div
            className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='bottom'
          >
            <img
              className='h-25px w-25px rounded'
              src={toAbsoluteUrl('/media/avatars/150-25.jpg')}
              alt='metronic'
            />
          </div>
          <HeaderUserMenu />
        </div> */}
      </div>
    </div>
  )
}

export { Topbar }
