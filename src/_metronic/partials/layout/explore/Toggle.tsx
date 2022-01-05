import React, {FC} from 'react'

const Toggle: FC = () => (
  <button
    id='kt_explore_toggle'
    className='btn btn-sm btn-white btn-active-primary shadow-sm position-fixed px-5 fw-bolder zindex-2 top-50 mt-10 end-0 transform-90 fs-6 rounded-top-0'
    title={`Our ROADMAP`}
    data-bs-toggle='tooltip'
    data-bs-placement='right'
    data-bs-trigger='hover'
  >
    <span id='kt_explore_toggle_label'>ROADMAP</span>
  </button>
)

export {Toggle}
