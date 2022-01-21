/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
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
    }else{
      voteData.push(symbol.toUpperCase())
      await setDoc(doc(db, "voterIP", myIP), {
        coin: voteData
      });
    }
  }

  const addVote = async (id: any) => {
    console.log(id)
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
      console.log(coinSymbol)
      if (await voteList.includes(coinSymbol)) {
        console.log(coinSymbol + ' Found')
        status = 0
      }
      coins[i].vote = status
    }
    await setPromotedList(coins)
  }

  const main = async () => {
    let ipAddress = await getIP()
    let voteList = await getVoteList(ipAddress)
    let coins = await getCoins('sponsored')
    await populateVotes(coins, voteList)
    setLoading(1)
  }


  const submitVote = async (coin: string, index: number, id:string) => {
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
    // let coins = await promotedList
    // //@ts-ignore
    // coins[index].vote = 2
    // await setPromotedList(coins)
    // console.log(promotedList)
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
                <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
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
          {/* <td>
        <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
      0.0087$
    </a>
        <span className='text-dark fw-bold text-dark d-block fs-7'>$0.0...02877</span>
      </td> */}
          <td>
            {/* <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
    $308,236,260
    </a> */}
            <span className='text-dark fw-bold text-dark d-block fs-7'>{
              //@ts-ignore
              item.mCap == 0 ? '--' : '$' + Number(item.mCap).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
          </td>
          <td><span className="badge badge-square badge-success fs-6 p-3">{
            //@ts-ignore
            item.votes}</span></td>
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
              <button type='submit' className='btn btn-sm btn-primary pl-2 pr-5' data-kt-menu-dismiss='true' onClick={() => { submitVote(item.symbol, index, item.id) }}>
                VOTE !
              </button>
            }
            {
              //@ts-ignore
              item.vote == 0 &&
              <button type='submit' disabled className='btn btn-sm btn-secondary' data-kt-menu-dismiss='true'>
                VOTED
              </button>

            }
            {
              //@ts-ignore
              item.vote == 2 &&
              <button type='submit' className='btn btn-sm btn-default' data-kt-menu-dismiss='true'>
                Voting In Progress
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
                <th className='ps-4 min-w-200px rounded-start'>Name</th>
                {/* <th className='min-w-125px'>Price</th> */}
                <th className='min-w-200px'>Market Cap</th>
                <th className='min-w-150px'>Votes</th>
                <th className='min-w-80px rounded-end'>Action</th>
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
