/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'
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
  FooterRight
} from '../../../_metronic/partials/widgets'


const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    {/* <div className="d-flex flex-row h-300px">
      <div className="d-flex flex-column flex-row-auto col-xxl-4">
        <div className="d-flex flex-column-fluid bg-success flex-center">
          <span className="text-white">Fluid Height</span>
        </div>
      </div>

      <div className="d-flex flex-column flex-row-fluid">


        <div className="d-flex flex-row flex-column-fluid">
          <div className="d-flex flex-row bg-dark flex-center">
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/general/gen032.svg'
              color='white'
              iconColor='primary'
              title='Advertisement banner'
              description='Banner goes here'

            />
          </div>

          <div className="d-flex flex-row-auto">
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/general/gen032.svg'
              color='white'
              iconColor='primary'
              title='Advertisement banner'
              description='Banner goes here'

            />
          </div>
        </div>
        <div className="d-flex flex-column-auto h-70px bg-info flex-center">
          <span className="text-white">Fixed Height</span>
        </div>
      </div>
    </div> */}
    <div className='row g-5 g-xl-8'>
      <div className='col-xxl-4'>
        <TablesWidget6
          className='card-xl-stretch mb-xl-8'
        />
      </div>
      <div className='col-xl-8'>
        <div className='row'>
          <div className='col-xl-3'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/general/gen032.svg'
              color='white'
              iconColor='primary'
              title='Advertise'
              description='Advertise with us'

            />
          </div>
          <div className='col-xl-9'>
            <StatisticsWidget7
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/general/gen032.svg'
              color='white'
              iconColor='primary'
              title='Advertisement banner'
              description='Banner goes here'
            />
          </div>
        </div>
        <div className='row'>
          <TablesWidget12 className='card-xxl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
    </div>

    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8'>

      <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
    </div>


    <div className='row' >
      <div className='col-xl-6 '>
        <FooterLeft
          className='card-xl-stretch mb-xl-8'
          svgIcon='/media/icons/duotune/general/gen032.svg'
          color='white'
          iconColor='primary'
          title='Advertise'
          description='Advertise with us'

        />
      </div>
      <div className='col-xl-6 '>
        <FooterRight
          className='card-xl-stretch mb-xl-8'
          svgIcon='/media/icons/duotune/general/gen032.svg'
          color='white'
          iconColor='primary'
          title='Advertise'
          description='Advertise with us'

        />
      </div>
    </div>

    {/* <div className='row'>
      <div className='col-xl-4'>
        <ListsWidget2 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
      </div>
    </div>

    <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>
      <div className='col-xxl-8'>
        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div> */}
  </>
)

const DashboardWrapper: FC = () => {
  // const intl = useIntl()
  // const response = fetch('https://geolocation-db.com/json/');
  // //@ts-ignore
  // const data = response.json();
  // console.log(data)
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      <PageTitle breadcrumbs={[]}>Best Coins Today</PageTitle>

      <DashboardPage />
    </>
  )
}

export { DashboardWrapper }
