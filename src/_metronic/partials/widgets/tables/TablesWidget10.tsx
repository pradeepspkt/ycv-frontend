/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, query, orderBy, startAfter, limit } from "firebase/firestore";
import { app, db } from '../../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  className: string
}

const TablesWidget10: React.FC<Props> = ({ className }) => {
  const [coinList, setCoinList] = useState([]);
  const [myIP, setIP] = useState('');
  const [voteList, setVoteList] = useState([]);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const getIP = async () => {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      await setIP(data.IPv4)
      console.log(myIP)
      console.log('--')
    }

    const getVotesByIP = async (docID: any) => {
      const docRef = doc(db, "voterIP", docID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await setVoteList(docSnap.data().coin)
      }
      console.log(voteList)
    }

    const getCoins = async (status: string) => {
      setCoinList([])
      let listTemp: any = []
      // const first = query(collection(db, "coins"), orderBy("votes"), limit(10));
      // const querySnapshot = await getDocs(first);
      const querySnapshot = await getDocs(collection(db, "coins"));
      querySnapshot.forEach(async (doc: any) => {
        let coinName = await doc.data().name
        let voteStatus = true
        voteList.forEach((coin: any) => {
          //@ts-ignore
          if (voteList.includes(coin)) {
            if (coin == coinName) {
              voteStatus = false
            }
          }
        })
        if (doc.data().status == status) {
          await listTemp.push({
            ...listTemp,
            ...doc.data(),
            id: doc.id,
            vote: voteStatus
          })
        }
      });
      await setCoinList(await listTemp)
    }

    getIP()
    getVotesByIP(myIP)
    console.log(voteList)
    getCoins('approved')
    setLoading(1)
  }, [])

  const submitVote = async (coin: string) => {
    toast.success('Successfuly voted for ' + coin.toUpperCase() + '!! Submit your vote again tomorrow.', {
      position: "bottom-right",
      icon: "🚀",
      autoClose: 5000,
      hideProgressBar: false,
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


  const renderList = coinList.map((item, index) => {
    if (index > 9) return
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

          </div>
        </td>
        <td>
          <div className='d-flex justify-content-start flex-column mt-4'>
            <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              {
                //@ts-ignore
                item.symbol.toUpperCase()
              }
            </a>

          </div>
        </td>
        <td>
          <div className='d-flex justify-content-start flex-column'>
            <span className='text-hover-primary mt-4 '>
              {
                //@ts-ignore
                item.name.toUpperCase()
              }
            </span>

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
          <span className='text-dark fw-bold text-dark d-block fs-7 mt-4'>{
            //@ts-ignore
            item.mCap == 0 ? '--' : '$' + Number(item.mCap).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
        </td>
        <td><span className="badge badge-square badge-success fs-6 p-3 mt-4">{
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
            item.vote ?
              //@ts-ignore
              <button type='submit' className='btn btn-sm btn-primary mt-2' data-kt-menu-dismiss='true' onClick={() => { submitVote(item.name) }}>
                VOTE
              </button>
              :
              <button type='submit' className='btn btn-sm btn-default mt-2' data-kt-menu-dismiss='true'>
                VOTED
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
          title='Click to add a user'
        >
           <Link to="/all-coins" className="btn btn-primary btn-sm"> <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
            View All</Link>
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
                <th className='min-w-100px'>Avatar</th>
                <th className='min-w-200px'>Symbol</th>
                <th className='min-w-200px'>Name</th>
                <th className='min-w-200px'>Market Cap</th>
                {/* <th className='min-w-100px'>Price</th> */}
                <th className='min-w-200px'>Votes</th>
                <th className='min-w-10px text-start rounded-end'>Action</th>

              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {renderList}
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
    </div>
  )
}

export { TablesWidget10 }
