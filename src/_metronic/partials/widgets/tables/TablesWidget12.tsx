/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc, query, where, orderBy, limit } from "firebase/firestore";
import { app, db } from '../../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

type Props = {
  className: string,
  hideViewAllButton?: Boolean
}

const TablesWidget12: React.FC<Props> = ({ className, hideViewAllButton }) => {
  const [loading, setLoading] = useState(0);
  const [promotedList, setPromotedList] = useState([]);
  const [myIP, setIP] = useState('');
  const [voteList, setVoteList] = useState([]);


  useEffect(() => {
    main()
  }, [])

  const getCoins = async (status: string) => {
    // setPromotedList([])
    let listTemp: any = []
     fetch('https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/getCoinsPromoted?status='+status)
            .then(response => {
                return response.json()
            })
            .then(data => {
              setPromotedList(data.coins)
            });
    return listTemp
  }


  const main = async () => {
    let coins = await getCoins('sponsored')
    setLoading(1)
  }

  const submitVote = async (coin: string, index: number, id: string) => {
    setPromotedList([])
    let tempCoins = await promotedList
    //@ts-ignore
    tempCoins[index].vote = 2
    await setPromotedList(tempCoins)
    // await renderList
    // toast.success('Voting for  ' + coin.toUpperCase() + ' is in progress!', {
    //   position: "bottom-right",
    //   icon: "🚀",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    
    await fetch('https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/addVote?symbol='+coin+'&docId='+id)
            .then(response => {
                return response.json()
            })
            .then(data => {
              if(data.success){
                toast.success(coin.toUpperCase()+' : Vote successfull! Please submit your vote again tomorrow.', {
                  position: "bottom-right",
                  icon: "🚀",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }else{
                toast.success('Try voting again tomorrow.', {
                  position: "bottom-right",
                  icon: "🚀",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
              
            });

    await main()
  }

  const renderList = promotedList.map((item, index) => {
    if (index > 5 && !hideViewAllButton) return
    return (
      <>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <div className='symbol symbol-50px me-5'>
                <span className='symbol-label bg-light'>
                  <img
                    //@ts-ignore
                    src={item.avatar}
                    className='h-75 align-self-end'
                    alt=''
                  />
                </span>
              </div>
              <div className='d-flex justify-content-start flex-column'>
                <a href={
                  //@ts-ignore
                  '/coin-details/' + item.symbol
                } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                  {
                    //@ts-ignore
                    item.symbol.toUpperCase()
                  }
                </a>
                <span className='text-muted fw-bold text-muted d-block fs-7'>
                  {
                    //@ts-ignore
                    item.name.toUpperCase()
                  }
                </span>
              </div>
            </div>
          </td>
          <td className="d-none d-lg-table-cell">
            {
              //@ts-ignore
              item.network ? item.network.toUpperCase() : 'NA'}
          </td>
          {/* <td>
        <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
      0.0087$
    </a>
        <span className='text-dark fw-bold text-dark d-block fs-7'>$0.0...02877</span>
      </td> */}
          <td className="d-none d-lg-table-cell">
            {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
    $308,236,260
    </a> */}
            <span className='text-dark fw-bold text-dark d-block fs-7'>{
              //@ts-ignore
              item.mCap == 0 || item.mCap == 'NA' ? '--' : '$' + Number(item.mCap).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
          </td>
          <td>
            {/* <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
          {
            //@ts-ignore
            item.vote ? 'VOTE' : 'VOTED'}
        </button> */}

            {/* <span className="badge badge-square badge-success fs-6 p-6">{
              //@ts-ignore
              item.votes}</span> */}
            {
              //@ts-ignore
              item.vote == 1 &&
              //@ts-ignore
              <>
                <div className="btn-group border border-success rounded" role="group" aria-label="Basic example">
                  <button type="button" disabled className="btn btn-default btn-sm"><b>{
                    //@ts-ignore
                    item.votes}</b></button>
                  <button type='submit' className='btn btn-sm btn-primary pl-2 pr-5' data-kt-menu-dismiss='true' onClick={() => {
                    //@ts-ignore
                    submitVote(item.symbol, index, item.id)
                  }}>
                    VOTE !
                  </button>
                </div>

              </>
            }
            {
              //@ts-ignore
              item.vote == 0 &&
              <>
                <div className="btn-group border border-success rounded" role="group" aria-label="Basic example">
                  <button type="button" disabled className="btn btn-default btn-sm">{
                    //@ts-ignore
                    item.votes}</button>
                  <button type='submit' disabled className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                    VOTED
                  </button>
                </div>
              </>


            }
            {
              //@ts-ignore
              item.vote == 2 &&
              <button type='submit' disabled className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                Voting..
              </button>
            }

            {/* {
              //@ts-ignore
              item.vote ?
                //@ts-ignore
                <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true' onClick={() => { submitVote(item.symbol) }}>
                  VOTE
                </button>
                :
                item.vote == 2 ? null : null 
                :
            <button type='submit' className='btn btn-sm btn-default' data-kt-menu-dismiss='true'>
              VOTED
            </button>
            } */}


            {/* <button type="button" className="btn btn-primary">
  Vote <span className="badge badge-light">4</span>
</button> */}
          </td>
        </tr>
      </>
    )


  });

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
            {/* <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Ticket
              </a>
            </div> */}
            {/* end::Menu item */}
            {/* begin::Menu item */}
            {/* {
              hideViewAllButton ?
                null :
                <Link to="/all-coins" className="btn btn-primary btn-sm"> <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                  View All</Link>
            } */}
            {
              hideViewAllButton ?
                null :
                <div className='menu-item px-3'>
                  <Link to="/promoted-coins" className="menu-link px-3"> <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                    View All</Link>
                </div>
            }

            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                Contact Us
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mt-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            {/* <div className='menu-item px-3'>
              <div className='menu-content px-3 py-3'>
                <a className='btn btn-primary btn-sm px-4' href='#'>
                  Generate Reports
                </a>
              </div>
            </div> */}
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
              <tr className='fw-bolder bg-light h-50px'>
                <th className='ps-4 min-w-150px rounded-start'>Name</th>
                <th className='ps-4 min-w-200px rounded-start d-none d-lg-table-cell'>Network</th>
                {/* <th className='min-w-125px'>Price</th> */}
                <th className='min-w-200px d-none d-lg-table-cell'>Market Cap</th>
                <th className='min-w-150px'>Votes</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {renderList}

            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
      <ToastContainer
        position="bottom-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontFamily: 'inherit', fontWeight: 'bold' }}
      />
    </div>
  )
}

export { TablesWidget12 }
