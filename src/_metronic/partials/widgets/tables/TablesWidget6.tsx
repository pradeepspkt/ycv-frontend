/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'

type Props = {
  className: string
}

const TablesWidget6: React.FC<Props> = ({ className }) => {
  const [coinList, setCoinList] = useState([]);
  const [metric, setMetricData] = useState('24h');


  useEffect(() => {
    loadTrendingTokens('24h')
  }, [])

  const setMetric = (data: string) => {
    setMetricData(data)
    loadTrendingTokens(data)
  }

  const loadTrendingTokens = async (timeframe:string) => {
    const response = await fetch('https://api.coinmarketcap.com/data-api/v3/topsearch/rank?timeframe='+timeframe);
    const data = await response.json();
    await setCoinList(data.data.cryptoTopSearchRanks)

  }

  const renderList = coinList.map((item, index, category) => {
    if (index > 8) return
    let pricePercentage = 0
    //@ts-ignore
    if (metric === '24h') pricePercentage = item.priceChange.priceChange24h.toFixed(2)
    //@ts-ignore
    else if (metric === '7d') pricePercentage = item.priceChange.priceChange7d.toFixed(2)
    //@ts-ignore
    else if (metric === '30d') pricePercentage = item.priceChange.priceChange30d.toFixed(2)
    //@ts-ignore
    let imageUrl = 'https://s2.coinmarketcap.com/static/img/coins/64x64/' + item.id + '.png'
    return (
      <tr>
        <td>
          <div className='symbol symbol-50px me-2'>
            <span className='symbol-label'>
              <img
                //@ts-ignore
                src={imageUrl}
                className='h-75 align-self-end'
                alt=''
              />
            </span>
          </div>
        </td>
        <td>
          <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
            {
              //@ts-ignore
              item.symbol}
          </a>
          <span className='text-muted fw-bold d-block'>{
            //@ts-ignore
            item.name}</span>
        </td>
        {/* <td>
                      <span className='text-muted fw-bold d-block fs-7'>Paid</span>
                      <span className='text-dark fw-bolder d-block fs-5'>$200,500</span>
                    </td> */}
        <td className='text-end'>
          {
            //@ts-ignore
            pricePercentage < 0 ?
              <span className='text-danger fs-7 fw-bolder'>{
                //@ts-ignore
                pricePercentage}%</span>
              :
              <span className='text-success fs-7 fw-bolder'>{
                //@ts-ignore
                pricePercentage}%</span>
          }

        </td>
        <td className='text-end'>
          <a
            className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
          >
            {
              pricePercentage > 0 ?
              <KTSVG
              path='/media/icons/duotune/arrows/arr062.svg'
              className='svg-icon-2 svg-icon-success'
            />
            :
            <KTSVG
              path='/media/icons/duotune/arrows/arr065.svg'
              className='svg-icon-2 svg-icon-danger'
            />
            }
           
          </a>
        </td>
      </tr>
    )
  }
  );


  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Top Trending Tokens</span>
          {/* <span className='text-muted mt-1 fw-bold fs-7'>More than 400 new authors</span> */}
        </h3>
        <div className='card-toolbar'>
          <ul className='nav'>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bolder px-4 me-1'
                data-bs-toggle='tab'
                href='#kt_table_widget_6_tab_1'
                onClick={()=>{setMetric('24h')}}
              >
                Day
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4 me-1'
                data-bs-toggle='tab'
                href='#kt_table_widget_6_tab_2'
                onClick={()=>{setMetric('7d')}}
              >
                Week
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4'
                data-bs-toggle='tab'
                href='#kt_table_widget_6_tab_3'
                onClick={()=>{setMetric('30d')}}
              >
                Month
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_6_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-1'>
                {/* begin::Table head */}
                <thead>
                  <tr>
                    <th className='p-3 w-50px'></th>
                    {/* <th className='p-0 min-w-150px'></th> */}
                    <th className='p-0 min-w-140px'></th>
                    {/* <th className='p-0 min-w-120px'></th> */}
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {coinList ? renderList : null}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
          {/* begin::Tap pane */}
          <div className='tab-pane fade' id='kt_table_widget_6_tab_2'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-1'>
                {/* begin::Table head */}
                <thead>
                  <tr>
                    <th className='p-3 w-50px'></th>
                    <th className='p-0 min-w-150px'></th>
                    <th className='p-0 min-w-140px'></th>
                    <th className='p-0 min-w-120px'></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                 {renderList}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
          {/* begin::Tap pane */}
          <div className='tab-pane fade' id='kt_table_widget_6_tab_3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-1'>
                {/* begin::Table head */}
                <thead>
                  <tr>
                    <th className='p-3 w-50px'></th>
                    <th className='p-0 min-w-150px'></th>
                    <th className='p-0 min-w-140px'></th>
                    <th className='p-0 min-w-120px'></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                 {renderList}
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export { TablesWidget6 }
