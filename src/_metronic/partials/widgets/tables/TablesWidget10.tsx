/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, query, orderBy, startAfter, limit, setDoc, where } from "firebase/firestore";
import { app, db } from '../../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { ReactReduxContext } from 'react-redux'

type Props = {
  className: string,
  hideViewAllButton?: Boolean
}

const TablesWidget10: React.FC<Props> = ({ className, hideViewAllButton }) => {
  const [coinList, setCoinList] = useState([]);
  const [myIP, setIP] = useState('');
  const [voteList, setVoteList] = useState([]);
  const [loading, setLoading] = useState(0);
  // const [selectedNetwork, setNetwork] = useState('BSC')
  const { store } = useContext(ReactReduxContext)

  useEffect(() => {
    main()

  }, [])

  const getIP = async () => {
    const response = await fetch('https://geolocation-db.com/json/');
    const data = await response.json();
    await setIP(data.IPv4)
    return data.IPv4
  }

  const getVoteList = async (ip: any) => {
    const docRef = doc(db, "voterIP", ip);
    const docSnap = await getDoc(docRef);
    let ipData: any = []
    if (docSnap.exists()) {
      await setVoteList(docSnap.data().coin)
      ipData = docSnap.data().coin
    }
    return ipData
  }

  const addToVoteList = async (ip: any, symbol: any) => {
    const docRef = doc(db, "voterIP", ip);
    const docSnap = await getDoc(docRef);
    let voteData: any = []
    if (docSnap.exists()) {
      voteData = docSnap.data().coin
      voteData.push(symbol.toUpperCase())
      await updateDoc(docRef, {
        coin: voteData
      });
    } else {
      voteData.push(symbol.toUpperCase())
      await setDoc(doc(db, "voterIP", myIP), {
        coin: voteData
      });
    }
  }

  const addVote = async (id: any) => {
    const docRef = doc(db, "coins", id);
    const docSnap = await getDoc(docRef);
    let count: any = null
    if (docSnap.exists()) {
      count = docSnap.data().votes + 1
      await updateDoc(docRef, {
        votes: count
      });
    }
  }

  const getCoins = async (status: string) => {
    // setPromotedList([])
    let listTemp: any = []
    const querySnapshot = await getDocs(collection(db, "coins"));
    querySnapshot.forEach(async (doc: any) => {
      if (doc.data().status == status) {
        await listTemp.push({
          ...doc.data(),
          id: doc.id,
        })
      }
    });
    return listTemp
  }

  const populateVotes = async (coins: any, voteList: any) => {
    for (let i = 0; i < coins.length; i++) {
      let coinSymbol = (coins[i].symbol).toUpperCase()
      let status = 1
      if (await voteList.includes(coinSymbol)) {
        status = 0
      }
      coins[i].vote = status
    }
    await setCoinList(coins)
  }

  const main = async () => {
    let ipAddress = await getIP()
    let voteList = await getVoteList(ipAddress)
    let coins = await getCoins('approved')
    await populateVotes(coins, voteList)
    setLoading(1)
  }

  const submitVote = async (coin: string, index: number, id: string) => {
    setCoinList([])
    let tempCoins = await coinList
    //@ts-ignore
    tempCoins[index].vote = 2
    await setCoinList(tempCoins)
    await renderList

    toast.success('Voting for  ' + coin.toUpperCase() + ' is in progress!', {
      position: "bottom-right",
      icon: "🚀",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    let coins = await coinList
    //@ts-ignore
    coins[index].vote = 2
    await setCoinList(coins)
    await addToVoteList(myIP, coin)
    await addVote(id)
    await main()

    toast.success('Vote successfull! Please submit your vote again tomorrow.', {
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

  function round(val: any, multiplesOf: any) {
    var s = 1 / multiplesOf;
    var res = Math.ceil(val * s) / s;
    res = res < val ? res + multiplesOf : res;
    var afterZero = multiplesOf.toString().split(".")[1];
    return parseFloat(res.toFixed(afterZero ? afterZero.length : 0));
  }

  const setNetwork = async (network: string) => {
    let listTemp: any = []
    const q = query(collection(db, "coins"), where("network", "==", network));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
      await listTemp.push({
        ...doc.data(),
        id: doc.id,
      })
    });
    let voteList = await getVoteList(myIP)
    let coins = listTemp
    await populateVotes(coins, voteList)
    await setCoinList(listTemp)
  }

  const renderList = coinList.map((item, index) => {
    if (index > 9 && !hideViewAllButton) return
    return (
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
              {/* <span className='text-muted fw-bold text-muted d-block fs-7'>
                  {
                    //@ts-ignore
                    item.name.toUpperCase()
                  }
                </span> */}
            </div>
          </div>
        </td>
        {/* <td>
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

          </div>
        </td> */}
        <td className="d-none d-lg-table-cell">
          <div className='d-flex justify-content-start flex-column mt-4'>
            <a href={
              //@ts-ignore
              '/coin-details/' + item.symbol
            } className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              {
                //@ts-ignore
                item.name.toUpperCase()
              }
            </a>

          </div>
        </td>
        {/* <td className="d-none d-lg-table-cell">
          <div className='d-flex justify-content-start flex-column'>
            <span className='text-hover-primary mt-4 '>
              {
                //@ts-ignore
                item.name.toUpperCase()
              }
            </span>

          </div>

        </td> */}
        {/* <td>
    <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
  0.0087$
</a>
    <span className='text-dark fw-bold text-dark d-block fs-7'>$0.0...02877</span>
  </td> */}
        <td className="d-none d-lg-table-cell">
          {
            //@ts-ignore
            item.network ? item.network.toUpperCase() : 'NA'}
        </td>
        <td className="d-none d-lg-table-cell">
          {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
$308,236,260
</a> */}
          <span className='text-dark fw-bold text-dark d-block fs-7 mt-4'>{
            //@ts-ignore
            item.mCap == 0 ? '--' : '$' + Number(item.mCap).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
        </td>

        <td>
          {/* <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
      {
        //@ts-ignore
        item.vote ? 'VOTE' : 'VOTED'}
    </button> */}


          {
            //@ts-ignore
            item.vote == 1 &&
            //@ts-ignore
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
          }
          {
            //@ts-ignore
            item.vote == 0 &&
            <div className="btn-group border border-success rounded" role="group" aria-label="Basic example">
              <button type="button" disabled className="btn btn-default btn-sm">{
                //@ts-ignore
                item.votes}</button>
              <button type='submit' disabled className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                VOTED
              </button>
            </div>

          }
          {
            //@ts-ignore
            item.vote == 2 &&
            <button type='submit' disabled className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
              Voting..
            </button>
          }

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
          <span className='card-label fw-bolder fs-3 mb-1'>All Tokens</span>
          <span className='text-muted mt-1 fw-bold fs-7'>Vote your favorite token</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Select network'
        >

          <ul className='nav'>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bolder px-4'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_3'
                onClick={() => { main() }}
              >
                All
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4 me-1'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_1'
                onClick={() => { setNetwork('BSC') }}
              >
                BSC
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4 me-1'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_2'
                onClick={() => { setNetwork('ETH') }}
              >
                ETH
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_3'
                onClick={() => { setNetwork('MATIC') }}
              >
                MATIC
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_3'
                onClick={() => { setNetwork('TRX') }}
              >
                TRX
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_3'
                onClick={() => { setNetwork('FTM') }}
              >
                FTM
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_3'
                onClick={() => { setNetwork('SOL') }}
              >
                SOL
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_3'
                onClick={() => { setNetwork('KCC') }}
              >
                KCC
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bolder px-4'
                data-bs-toggle='tab'
                // href='#kt_table_widget_6_tab_3'
                onClick={() => { setNetwork('Other') }}
              >
                Other
              </a>
            </li>
          </ul>
          {
            hideViewAllButton ?
              null :
              <Link to="/all-coins" className="btn btn-sm btn-light-primary"> <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                View All</Link>
          }
          {/* <a
            href='#'
            className='btn btn-sm btn-light-primary'
          // data-bs-toggle='modal'
          // data-bs-target='#kt_modal_invite_friends'
          >
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            View All
          </a> */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-rounded table-striped border border-gray-300 gy-2 gs-5 table-hover'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted fw-bold fs-6 text-gray-800 border border-gray-200 h-50px pb-5 bg-light'>
                {/* <th className='min-w-100px'>Avatar</th> */}
                <th className='min-w-200px'>Coin</th>
                <th className='min-w-250px d-none d-lg-table-cell'>Name</th>
                <th className='ps-4 min-w-200px rounded-start d-none d-lg-table-cell'>Network</th>

                <th className='min-w-200px d-none d-lg-table-cell'>Market Cap</th>
                {/* <th className='min-w-100px'>Price</th> */}
                {/* <th className='min-w-200px'>Votes</th> */}
                <th className='min-w-10px text-start rounded-end'>Votes</th>

              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {renderList.length > 0 ?
              renderList 
            :
            <div className='m-5 mt-5 mb-5'>
            Coins not found.
            </div>}
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

          <div className='card-header'>
            <span className='mt-5 align-items-start flex-column'>
              Page 1 of {round(coinList.length / 10, 1)}
            </span>
            <ul className="pagination pagination-outline mt-3">
              <li className="page-item previous disabled m-1"><a href="#" className="page-link"><i className="previous"></i></a></li>

              <li className="page-item next m-1"><a href="#" className="page-link"><i className="next"></i></a></li>
            </ul>
          </div>
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
      />
    </div>
  )
}

export { TablesWidget10 }
