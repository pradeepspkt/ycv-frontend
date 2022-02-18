/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, query, orderBy, startAfter, limit, setDoc, where, endBefore, startAt } from "firebase/firestore";
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
  const [network, setNetworkData] = useState('');
  const [voteList, setVoteList] = useState([]);
  const [loading, setLoading] = useState(0);
  const [lastVisible, setLastVisible] = useState([]);
  const [firstVisible, setFirstVisible] = useState([]);
  const [previousStart, setPreviousStart] = useState({});
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState(null)
  const [rows, setRows] = useState(10)
  // const [selectedNetwork, setNetwork] = useState('BSC')
  const { store } = useContext(ReactReduxContext)

  useEffect(() => {
    main()

  }, [])


  const calculatePages = async (networkData: string) => {
    //get approved coins count pages
    let dataCount: number = 1
    // let qAll;


    const qAll = await networkData.length > 0 ?
      query(collection(db, "coins"), where('status', '==', "approved"), where("network", "==", networkData))
      :
      query(collection(db, "coins"), where('status', '==', "approved"))


    const querySnapshotAll = await getDocs(qAll);
    //@ts-ignore
    querySnapshotAll.forEach(async (doc) => {
      dataCount = dataCount + 1
    });
    console.log('NETWORK: ' + networkData)
    console.log('data: ' + dataCount)
    const pages = await round(dataCount / rows, 1)
    //@ts-ignore  
    await setPages(pages)
    return pages
  }

  const getCoins = async () => {
    setLoading(0)
    // setPromotedList([])
    let listTemp: any = []
    let lastVisbileData: any = [], firstVisibleData: any = []
    let respData: any = []

    const coinPromise = new Promise(async (resolve, reject) => {
      await fetch('https://us-central1-your-crypto-voice.cloudfunctions.net/getCoinsAll')
        .then(response => {
          return response.json()
        })
        .then(async (data) => {
          respData = data
          resolve(respData)
        });
    })

    coinPromise.then(async (data: any) => {
      await setCoinList(data.coins)
      await setPages(data.pages)
      await lastVisbileData.push(respData.lastVisible)
      await firstVisibleData.push(respData.firstVisible)
      await setLastVisible(lastVisbileData)
      await setFirstVisible(firstVisibleData)
    })


   


    // //get approved coins with limit
    // const q = query(collection(db, "coins"), where('status', '==', "approved"), orderBy("votes", "desc"), limit(rows));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach(async (doc) => {
    //   await listTemp.push({
    //     ...doc.data(),
    //     id: doc.id,
    //   })
    // });


    // let tempLastVisible: any = []
    // const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    // tempLastVisible.push(lastVisible)
    // await setLastVisible(tempLastVisible)

    // let tempFirstVisible: any = []
    // const firstVisible = await querySnapshot.docs[0]
    // tempFirstVisible.push(firstVisible)
    // await setFirstVisible(tempFirstVisible)
    // //@ts-ignore
    // setLoading(1)
    // return listTemp
  }

  const loadPrevPage = async () => {
    //@ts-ignore

    let url = ""
    console.log(lastVisible)
    const nextQuery = network.length > 0 ?
    //@ts-ignore
      url = 'https://us-central1-your-crypto-voice.cloudfunctions.net/getCoinsAll?network=' + network + '&startAt=' + firstVisible[firstVisible.length - 2]
      :
      //@ts-ignore
      url = 'https://us-central1-your-crypto-voice.cloudfunctions.net/getCoinsAll?startAt=' + firstVisible[firstVisible.length - 2]


    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(async(data) => {
        setCoinList(data.coins)
        setPages(data.pages)
        let lastVisbileData: any = lastVisible, firstVisibleData: any = firstVisible
        await firstVisibleData.pop()
        await lastVisbileData.pop()

        console.log(firstVisible)
        console.log(lastVisible)

        setLastVisible(lastVisbileData)
        setFirstVisible(firstVisibleData)
        setCurrentPage(currentPage-1)
      });

    // let listTemp: any = []
    // let tempLastVisible = lastVisible
    // let tempFirstVisible = firstVisible

    // const next = network.length > 0 ?
    //   query(collection(db, "coins"),
    //     orderBy("votes", "desc"),
    //     where('status', '==', "approved"),
    //     where('network', '==', network),
    //     startAt(tempFirstVisible[tempFirstVisible.length - 2]),
    //     // endBefore(tempLastVisible[tempLastVisible.length - 1]),
    //     limit(rows))
    //   :
    //   query(collection(db, "coins"),
    //     orderBy("votes", "desc"),
    //     where('status', '==', "approved"),
    //     startAt(tempFirstVisible[tempFirstVisible.length - 2]),
    //     // endBefore(tempLastVisible[tempLastVisible.length - 1]),
    //     limit(rows));
    // const querySnapshot = await getDocs(next);
    // querySnapshot.forEach(async (doc) => {
    //   await listTemp.push({
    //     ...doc.data(),
    //     id: doc.id,
    //   })
    // });
    // // let voteList = await getVoteList(myIP)
    // // await populateVotes(listTemp, voteList)

    // let popFirstVisible = tempFirstVisible.pop()
    // //@ts-ignore
    // setLastVisible(popFirstVisible)

    // await setCurrentPage(currentPage - 1)

    // const lastVisibleData = querySnapshot.docs[querySnapshot.docs.length - 1];
    // //@ts-ignore
    // tempLastVisible.push(lastVisibleData)
    // await setLastVisible(tempLastVisible)



  }

  const loadNextPage = async () => {
    let url = ""
    let respData:any = []
    let templastVisbileData: any = lastVisible
    let tempfirstVisibleData: any = firstVisible

    const nextQuery = network.length > 0 ?
    //@ts-ignore
      url = 'https://us-central1-your-crypto-voice.cloudfunctions.net/getCoinsAll?network=' + network + '&startAfter=' + lastVisible[lastVisible.length - 1]
      :
      //@ts-ignore
      url = 'https://us-central1-your-crypto-voice.cloudfunctions.net/getCoinsAll?startAfter=' + lastVisible[lastVisible.length - 1]


    const coinPromise = new Promise(async (resolve, reject) => {
      await fetch(url)
        .then(response => {
          return response.json()
        })
        .then(async (data) => {
          respData = data
          resolve(respData)
        });
    })

    coinPromise.then(async (data: any) => {
      setCoinList(data.coins)
      setPages(data.pages)
      
      templastVisbileData.push(data.coins[data.coins.length-1].id)
      tempfirstVisibleData.push(data.coins[0].id)
      

      await setLastVisible(templastVisbileData)
      await setFirstVisible(tempfirstVisibleData)

      await setCurrentPage(currentPage + 1)
    })
    
    console.log(firstVisible)
    console.log(lastVisible)
    

    // let listTemp: any = []
    // //@ts-ignore

    // const next = network.length > 0 ?
    //   await query(collection(db, "coins"),
    //     orderBy("votes", "desc"),
    //     where('status', '==', "approved"),
    //     where('network', '==', network),
    //     startAfter(lastVisible[lastVisible.length - 1]),
    //     limit(rows))
    //   :
    //   await query(collection(db, "coins"),
    //     orderBy("votes", "desc"),
    //     where('status', '==', "approved"),
    //     startAfter(lastVisible[lastVisible.length - 1]),
    //     limit(rows));
    // const querySnapshot = await getDocs(next);
    // querySnapshot.forEach(async (doc) => {
    //   await listTemp.push({
    //     ...doc.data(),
    //     id: doc.id,
    //   })
    // });

    // await setCurrentPage(currentPage + 1)

    // let tempLastVisible = lastVisible
    // const lastVisibleData = querySnapshot.docs[querySnapshot.docs.length - 1];
    // //@ts-ignore
    // tempLastVisible.push(lastVisibleData)
    // await setLastVisible(tempLastVisible)

    // let tempFirstVisible = firstVisible
    // const firstVisibleData = await querySnapshot.docs[0]
    // //@ts-ignore
    // tempFirstVisible.push(firstVisibleData)
    // await setFirstVisible(tempFirstVisible)

    // let voteList = await getVoteList(myIP)
    // await populateVotes(listTemp, voteList)
  }

  const main = async () => {
    let coins = await getCoins()
    // await calculatePages("")
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


    await fetch('https://us-central1-your-crypto-voice.cloudfunctions.net/addVote?symbol='+coin+'&docId='+id)
            .then(response => {
                return response.json()
            })
            .then(data => {
              if(data.success){
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

  const setNetworkState = async (network: string) => {
    await setNetworkData(network)
    return network
  }

  function round(val: any, multiplesOf: any) {
    var s = 1 / multiplesOf;
    var res = Math.ceil(val * s) / s;
    res = res < val ? res + multiplesOf : res;
    var afterZero = multiplesOf.toString().split(".")[1];
    return parseFloat(res.toFixed(afterZero ? afterZero.length : 0));
  }

  const setNetwork = async (network: string) => {
    setCurrentPage(1)
    if(network == "All") {
      getCoins()
      return
    }
    fetch('https://us-central1-your-crypto-voice.cloudfunctions.net/getCoinsAll?network='+network)
            .then(response => {
                return response.json()
            })
            .then(data => {
              setCoinList(data.coins)
              setPages(data.pages)
            });

    // await setFirstVisible([])
    // await setLastVisible([])
    // //@ts-ignore
    // await setCurrentPage(1)

    // if (network == 'All') {
    //   await setNetworkData('')
    //   await main()
    //   return
    // }
    // let networkValue = await setNetworkState(network)
    // let pages = await calculatePages(networkValue)
    // let listTemp: any = []
    // const q = query(collection(db, "coins"), where("network", "==", network), limit(rows));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach(async (doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   await listTemp.push({
    //     ...doc.data(),
    //     id: doc.id,
    //   })
    // });

    // let tempLastVisible: any = []
    // const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    // tempLastVisible.push(lastVisible)
    // await setLastVisible(tempLastVisible)

    // let tempFirstVisible: any = []
    // const firstVisible = await querySnapshot.docs[0]
    // tempFirstVisible.push(firstVisible)
    // await setFirstVisible(tempFirstVisible)

    // // let voteList = await getVoteList(myIP)
    // let coins = listTemp
    // // await populateVotes(coins, voteList)
    // await setCoinList(listTemp)
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
                onClick={() => { setNetwork('All') }}
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
              Page {currentPage} of {pages}
            </span>
            <ul className="pagination pagination-outline mt-3">
              <li className={currentPage > 1 ? "page-item previous m-1" : "page-item previous disabled m-1"}><a onClick={loadPrevPage} className="page-link"><i className="previous"></i></a></li>
              <li className={currentPage == pages ? "page-item next m-1 disabled" : "page-item next m-1"}><a onClick={loadNextPage} className="page-link"><i className="next"></i></a></li>

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
