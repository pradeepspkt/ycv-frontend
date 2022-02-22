/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Formik, Form, FormikValues, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {StepperComponent} from '../../../assets/ts/components'
import {Switch} from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc, updateDoc, addDoc} from 'firebase/firestore'
import {app, db, storage} from '../../../../firebase'
import {getStorage, ref, uploadString, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

var sizeOf = require('image-size')

interface ICreateAccount {
  appName: string
  category: string
  mCap: string
  symbol: string
  description: string
  chartLink: string
  webLink: string
  framework: string
  dbName: string
  dbType: string
  nameOnCard: string
  cardNumber: string
  cardExpiryMonth: string
  cardExpiryYear: string
  cardCvv: string
  saveCard: string
  discordLink: string
  telegramLink: string
  contractAddress: string
  email: string
}

const inits: ICreateAccount = {
  appName: '',
  category: '1',
  mCap: '',
  symbol: '',
  description: '',
  chartLink: '',
  webLink: '',
  framework: '1',
  dbName: '',
  dbType: '1',
  nameOnCard: 'Max Doe',
  cardNumber: '4111 1111 1111 1111',
  cardExpiryMonth: '1',
  cardExpiryYear: '2025',
  cardCvv: '123',
  saveCard: '1',
  discordLink: '',
  telegramLink: '',
  contractAddress: '',
  email: '',
}

const createAppSchema = [
  Yup.object({
    appName: Yup.string().required().label('Coin name'),
    symbol: Yup.string().required().label('Symbol'),
    mCap: Yup.string().label('Market cap'),
    contractAddress: Yup.string().required().label('Contract Address'),
    email: Yup.string().required().label('Email'),
  }),
  Yup.object({
    description: Yup.string().required().label('Description'),
  }),
  Yup.object({
    chartLink: Yup.string().label('Chart Link'),
    webLink: Yup.string().required().label('Website Link'),
  }),
]

const Main: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAppSchema[0])
  const [initValues] = useState<ICreateAccount>(inits)

  const [showSnack, setShowSnack] = useState(true)
  const [snackMsg, setSnackMsg] = useState('')

  const [tokenName, setTokenName] = useState('')
  const [email, setEmail] = useState('')
  const [discordLink, setDiscordLink] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [telegramLink, setTelegramLink] = useState('')
  const [symbol, setSymbol] = useState('')
  const [network, setNetwork] = useState('BSC')
  const [mCap, setMCap] = useState('')
  const [description, setDescription] = useState('')
  const [chartlink, setChartLink] = useState('')
  const [websiteLink, setWebsiteLink] = useState('')
  const [tokenLogo, setTokenLogo] = useState('')
  const [checkbox, setCheckbox] = useState('0')

  const [file, setFile] = useState(null)
  const [imageURL, setURL] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)


  const storage = getStorage()
  //@ts-ignore

  // function handleChange(e:any) {
  //   setFile(e.target.files[0]);
  // }

  // change: function(event) {
  //   this.setState({ value: event.target.value });
  // },

  const selectChange = async (event) => {
    await setNetwork(event.target.value)
  }

  const toggleCheckbox = async () =>{
    await setCheckboxValue(!checkboxValue)
    if(checkboxValue){
      await disableSubmitButton(true)
    }else{
     await  disableSubmitButton(false)
    }
  }

  const toggleShowSnack = () => setShowSnack(!showSnack)
  const snackMessage = (message: string) => {
    setSnackMsg(message)
  }

  const handleChange = async (e: any) => {
    await setFile(await e.target.files[0])
    let reader = new FileReader()
    await reader.readAsDataURL(await e.target.files[0])
    reader.onload = async (e: any) => {
      //@ts-ignore
      await setURL(await e.target.result.split(',')[1])
    }
  }

  // const postCoinData = async(data:any) => {

  //   fetch('https://us-central1-your-crypto-voice.cloudfunctions.net/addCoin', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const disableSubmitButton =  async(action:any) => {
    let modalBody = document.querySelector('.modal-body')
      let buttonElements = modalBody?.querySelectorAll('button')
    if(action){
      //@ts-ignore
      buttonElements[1].disabled = true
    }else{
      //@ts-ignore
      buttonElements[1].disabled = false
    }
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createAppSchema[stepper.current.currentStepIndex - 1])
  }

  const submitStep = async (values: ICreateAccount, actions: FormikValues) => {
    //@ts-ignore
    //@ts-ignore
    if (!file?.name) {
      //@ts-ignore
      await prevStep()
      alert("Please upload Token's logo.")
      return
    }
    //@ts-ignore
    else if (!file?.type.match('image.*')) {
      await prevStep()
      alert('Please upload valid image.')
      return
    } else {
      // var dimensions = sizeOf(file)
      var reader = new FileReader()
      //Read the contents of Image File.
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        var image: any = new Image()

        //Set the Base64 string return from FileReader as source.
        //@ts-ignore
        image.src = e.target.result

        //Validate the File Height and Width.
        image.onload = async function () {
          var height = this.height
          var width = this.width
          if (height > 96 || width > 96) {
            //show width and height to user
            alert('Logo Height and Width must not exceed 90px.')
            await prevStep()
            return false
          }
          // alert('Uploaded image has valid Height and Width.')
          // return true
        }
      }
    }

    //@ts-ignore
    if(stepper.current.currentStepIndex == 3 && !checkboxValue){
      disableSubmitButton(true)
    }

    setTokenName(values.appName)
    // setTokenLogo(file)
    setMCap(values.mCap)
    setContractAddress(values.contractAddress)
    setDiscordLink(values.discordLink)
    setChartLink(values.chartLink)
    setWebsiteLink(values.webLink)
    setDescription(values.description)
    setSymbol(values.symbol)
    setEmail(values.email)
    if (!stepper.current) {
      return
    }

    setCurrentSchema(createAppSchema[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      //@ts-ignore
      const storageRef = ref(storage, 'images/' + file.name)

      toast.success('🦄 Coin submission in progress', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      //@ts-ignore
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // toggleShowSnack()

          switch (snapshot.state) {
            case 'paused':
              break
            case 'running':
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          toast.success('Error submitting! Please try again later.', {
            position: 'bottom-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // const docRef = await addDoc(collection(db, "coins"), {
            //   name: values.appName,
            //   mCap: values.mCap,
            //   webLink: values.webLink,
            //   chartlink: values.chartLink,
            //   description: values.description,
            //   symbol: values.symbol,
            //   discordLink: values.discordLink,
            //   telegramLink: values.telegramLink,
            //   contractAddress: values.contractAddress,
            //   network: network,
            //   status: 'pending',
            //   votes: 0,
            //   avatar: downloadURL,
            //   email: values.email
            // });

            const data = {
              name: values.appName,
              mCap: values.mCap,
              webLink: values.webLink,
              chartlink: values.chartLink,
              description: values.description,
              symbol: values.symbol,
              discordLink: values.discordLink,
              telegramLink: values.telegramLink,
              contractAddress: values.contractAddress,
              network: network,
              status: 'pending',
              votes: 0,
              avatar: downloadURL,
              email: values.email,
            }

            fetch('https://us-central1-your-crypto-voice.cloudfunctions.net/addCoin', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then(async (data) => {
                await fetch(
                  'https://us-central1-your-crypto-voice.cloudfunctions.net/sendMail?dest=' +
                    values.email +
                    '&coin=' +
                    values.symbol +
                    '&status=pending'
                )
                  .then((response) => {})
                  .then((data) => {})

                await fetch(
                  'https://us-central1-your-crypto-voice.cloudfunctions.net/sendMail?dest=yourcryptovoice@gmail.com' +
                    '&coin=' +
                    values.symbol +
                    '&status=admin'
                )
                  .then((response) => {})
                  .then((data) => {})
                toast.success('🦄 Coin submitted successfully! Ready for review.', {
                  position: 'bottom-right',
                  autoClose: 10000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              })
              .catch((error) => {
                console.error('Error:', error)
              })

            // fetch('https://us-central1-your-crypto-voice.cloudfunctions.net/sendMail?dest='+values.email+'&coin='+values.appName+'&status=pending')
            // .then(response => {})
            // .then(data => {});
          })
        }
      )

      stepper.current.goto(1)
      actions.resetForm()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div className='modal fade' id='kt_modal_create_app' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered mw-900px'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>Submit Your Token</h2>

            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='modal-body py-lg-10 px-lg-10'>
            <div
              ref={stepperRef}
              className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
                <div className='stepper-nav ps-lg-10'>
                  <div className='stepper-item current' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>1</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Details</h3>

                      <div className='stepper-desc'>Token basics</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>2</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Description</h3>

                      <div className='stepper-desc'>More Details</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>3</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Links</h3>

                      <div className='stepper-desc'>External links</div>
                    </div>
                  </div>

                  {/* <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>4</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Billing</h3>

                      <div className='stepper-desc'>Provide payment details</div>
                    </div>
                  </div>
*/}
                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>5</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Release</h3>

                      <div className='stepper-desc'>Review and Submit</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex-row-fluid py-lg-5 px-lg-15'>
                <Formik
                  validationSchema={currentSchema}
                  initialValues={initValues}
                  onSubmit={submitStep}
                >
                  {() => (
                    <Form className='form' noValidate id='kt_modal_create_app_form'>
                      <div className='current' data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className='required'>Token Name</span>

                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify your unique token name'
                              ></i>
                            </label>

                            <Field
                              type='text'
                              className='form-control form-control-lg form-control-solid'
                              name='appName'
                              placeholder=''
                              // onChange={setTokenData('tokenName')}
                            />
                            {tokenName}
                            <div className='text-danger'>
                              <ErrorMessage name='appName' />
                            </div>
                          </div>
                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className='required'>Symbol</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify your unique token symbol'
                              ></i>
                            </label>

                            <Field
                              type='text'
                              className='form-control form-control-lg form-control-solid'
                              name='symbol'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='symbol' />
                            </div>
                          </div>
                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className=''>Market Cap</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify market cap'
                              ></i>
                            </label>

                            <Field
                              type='number'
                              min='1'
                              className='form-control form-control-lg form-control-solid'
                              name='mCap'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='mCap' />
                            </div>
                          </div>

                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className='required'>Contract Address</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify contract address'
                              ></i>
                            </label>

                            <Field
                              type='text'
                              min='1'
                              className='form-control form-control-lg form-control-solid'
                              name='contractAddress'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='contractAddress' />
                            </div>
                          </div>
                          {/* <div className="form-floating mb-9">
                            <Field as="select" name="color">
                              <option selected value="BSC">Binance Smart Chain (BSC)</option>
                              <option value="ETH">Ethereum (ETH)</option>
                              <option value="MATIC">Polygon (MATIC)</option>
                              <option value="TRX">Tron (TRX)</option>
                              <option value="FTM">Fantom (FTM)</option>
                              <option value="SOL">Solana (SOL)</option>
                              <option value="KCC">Kucoin Chain (KCC)</option>
                              <option value="Other">Other</option>
                            </Field>
                          </div> */}

                          <div className='form-floating mb-9'>
                            <select
                              className='form-select'
                              id='floatingSelect'
                              onChange={selectChange}
                              aria-label='Floating label select example'
                            >
                              <option selected value='BSC'>
                                Binance Smart Chain (BSC)
                              </option>
                              <option value='ETH'>Ethereum (ETH)</option>
                              <option value='MATIC'>Polygon (MATIC)</option>
                              <option value='TRX'>Tron (TRX)</option>
                              <option value='FTM'>Fantom (FTM)</option>
                              <option value='SOL'>Solana (SOL)</option>
                              <option value='KCC'>Kucoin Chain (KCC)</option>
                              <option value='Other'>Other</option>
                            </select>
                            <label>Select Network/Chain</label>
                          </div>

                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className='required'>Upload Image </span>
                              <span className='text-muted fs-7'>(40*40)</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Upload your image'
                              ></i>
                            </label>

                            <input
                              // allows you to reach into your file directory and upload image to the browser
                              type='file'
                              onChange={handleChange}
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='image' />
                            </div>
                          </div>

                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className=''>Contact Email</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify contact email'
                              ></i>
                            </label>

                            <Field
                              type='text'
                              className='form-control form-control-lg form-control-solid'
                              name='email'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='email' />
                            </div>
                          </div>

                          {/* <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Category</span>

                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Select your app category'
                              ></i>
                            </label>

                            <div className='fv-row'>
                              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-primary'>
                                      <KTSVG
                                        path='/media/icons/duotune/maps/map004.svg'
                                        className='svg-icon-1 svg-icon-primary'
                                      />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>
                                    <span className='fw-bolder fs-6'>Quick Online Courses</span>

                                    <span className='fs-7 text-muted'>
                                      Creating a clear text structure is just one SEO
                                    </span>
                                  </span>
                                </span>

                                <span className='form-check form-check-custom form-check-solid'>
                                  <Field
                                    className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value='1'
                                  />
                                </span>
                              </label>

                              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-danger  '>
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen024.svg'
                                        className='svg-icon-1 svg-icon-danger'
                                      />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>  // const setTokenData = (field: any) => {
  //   switch(field){

  //   }
  // }
                                    value='2'
                                  />
                                </span>
                              </label>

                              <label className='d-flex flex-stack cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-success'>
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen013.svg'
                                        className='svg-icon-1 svg-icon-success'
                                      />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>
                                    <span className='fw-bolder fs-6'>Full Intro Training</span>

                                    <span className='fs-7 text-muted'>
                                      Creating a clear text structure copywriting
                                    </span>
                                  </span>
                                </span>

                                <span className='form-check form-check-custom form-check-solid'>
                                  <Field
                                    className='form-check-input'
                                    type='radio'
                                    name='category'
                                    value='3'
                                  />
                                </span>
                              </label>
                            </div>

                            <div className='text-danger'>
                              <ErrorMessage name='category' />
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <div data-kt-stepper-element='content'>
                        <div className='fv-row mb-10'>
                          <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                            <span className='required'>Description</span>
                            <i
                              className='fas fa-exclamation-circle ms-2 fs-7'
                              data-bs-toggle='tooltip'
                              title='Specify your network'
                            ></i>
                          </label>

                          <Field
                            type='text'
                            as='textarea'
                            className='form-control form-control-lg form-control-solid'
                            name='description'
                            placeholder=''
                          />
                          <div className='text-danger'>
                            <ErrorMessage name='description' />
                          </div>
                        </div>
                        {/* <div className='w-100'>
                          <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Select Framework</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify your apps framework'
                              ></i>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-warning'>
                                    <i className='fab fa-html5 text-warning fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>HTML5</span>

                                  <span className='fs-7 text-muted'>Base Web Projec</span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='framework'
                                  value='1'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-success'>
                                    <i className='fab fa-react text-success fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>ReactJS</span>
                                  <span className='fs-7 text-muted'>
                                    Robust and flexible app framework
                                  </span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='framework'
                                  value='2'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-danger'>
                                    <i className='fab fa-angular text-danger fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>Angular</span>
                                  <span className='fs-7 text-muted'>Powerful data mangement</span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='framework'
                                  value='3'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-primary'>
                                    <i className='fab fa-vuejs text-primary fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>Vue</span>
                                  <span className='fs-7 text-muted'>
                                    Lightweight and responsive framework
                                  </span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='framework'
                                  value='4'
                                />
                              </span>
                            </label>
                          </div>
                          <div className='text-danger'>
                            <ErrorMessage name='framework' />
                          </div>
                        </div> */}
                      </div>

                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='fv-row mb-10'>
                            <label className='fs-5 fw-bold mb-2'>Chart link</label>

                            <Field
                              type='url'
                              className='form-control form-control-lg form-control-solid'
                              name='chartLink'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='chartLink' />
                            </div>
                          </div>

                          <div className='fv-row mb-10'>
                            <label className='required fs-5 fw-bold mb-2'>Website Link</label>

                            <Field
                              type='url'
                              className='form-control form-control-lg form-control-solid'
                              name='webLink'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='webLink' />
                            </div>
                          </div>

                          <div className='fv-row mb-10'>
                            <label className='fs-5 fw-bold mb-2'>Telegram Link</label>

                            <Field
                              type='url'
                              className='form-control form-control-lg form-control-solid'
                              name='telegramLink'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='telegramLink' />
                            </div>
                          </div>

                          <div className='fv-row mb-10'>
                            <label className='fs-5 fw-bold mb-2'>Discord Link</label>

                            <Field
                              type='url'
                              className='form-control form-control-lg form-control-solid'
                              name='discordLink'
                              placeholder=''
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='discordLink' />
                            </div>
                          </div>

                          {/* <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Select Database Engine</span>

                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Select your app database engine'
                              ></i>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-success'>
                                    <i className='fas fa-database text-success fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>MySQL</span>

                                  <span className='fs-7 text-muted'>Basic MySQL database</span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='dbType'
                                  value='1'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-danger'>
                                    <i className='fab fa-google text-danger fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>Firebase</span>

                                  <span className='fs-7 text-muted'>
                                    Google based app data management
                                  </span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='dbType'
                                  value='2'
                                />
                              </span>
                            </label>

                            <label className='d-flex flex-stack cursor-pointer'>
                              <span className='d-flex align-items-center me-2'>
                                <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-warning'>
                                    <i className='fab fa-amazon text-warning fs-2x'></i>
                                  </span>
                                </span>

                                <span className='d-flex flex-column'>
                                  <span className='fw-bolder fs-6'>DynamoDB</span>

                                  <span className='fs-7 text-muted'>
                                    Amazon Fast NoSQL Database
                                  </span>
                                </span>
                              </span>

                              <span className='form-check form-check-custom form-check-solid'>
                                <Field
                                  className='form-check-input'
                                  type='radio'
                                  name='dbType'
                                  value='3'
                                />
                              </span>
                            </label>
                          </div> */}

                          <div className='text-danger'>
                            <ErrorMessage name='dbType' />
                          </div>
                        </div>
                      </div>

                      {/* <div data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='pb-10 pb-lg-15'>
                            <h2 className='fw-bolder text-dark'>Billing Details</h2>

                            <div className='text-gray-400 fw-bold fs-6'>
                              If you need more info, please check out
                              <a href='#' className='text-primary fw-bolder'>
                                Help Page
                              </a>
                              .
                            </div>
                          </div>
                          <div className='d-flex flex-column mb-7 fv-row'>
                            <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2'>
                              <span className='required'>Name On Card</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title="Specify a card holder's name"
                              ></i>
                            </label>

                            <Field
                              type='text'
                              className='form-control form-control-solid'
                              placeholder=''
                              name='nameOnCard'
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='nameOnCard' />
                            </div>
                          </div>
                          <div className='d-flex flex-column mb-7 fv-row'>
                            <label className='required fs-6 fw-bold form-label mb-2'>
                              Card Number
                            </label>

                            <div className='position-relative'>
                              <Field
                                type='text'
                                className='form-control form-control-solid'
                                placeholder='Enter card number'
                                name='cardNumber'
                              />
                              <div className='text-danger'>
                                <ErrorMessage name='cardNumber' />
                              </div>

                              <div className='position-absolute translate-middle-y top-50 end-0 me-5'>
                                <img
                                  src={toAbsoluteUrl('/media/svg/card-logos/visa.svg')}
                                  alt=''
                                  className='h-25px'
                                />
                                <img
                                  src={toAbsoluteUrl('/media/svg/card-logos/mastercard.svg')}
                                  alt=''
                                  className='h-25px'
                                />
                                <img
                                  src={toAbsoluteUrl('/media/svg/card-logos/american-express.svg')}
                                  alt=''
                                  className='h-25px'
                                />
                              </div>
                            </div>
                          </div>
                          <div className='row mb-10'>
                            <div className='col-md-8 fv-row'>
                              <label className='required fs-6 fw-bold form-label mb-2'>
                                Expiration Date
                              </label>

                              <div className='row fv-row'>
                                <div className='col-6'>
                                  <Field
                                    as='select'
                                    name='cardExpiryMonth'
                                    className='form-select form-select-solid'
                                  >
                                    <option></option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                  </Field>
                                  <div className='text-danger'>
                                    <ErrorMessage name='cardExpiryMonth' />
                                  </div>
                                </div>

                                <div className='col-6'>
                                  <Field
                                    as='select'
                                    name='cardExpiryYear'
                                    className='form-select form-select-solid'
                                  >
                                    <option></option>
                                    <option value='2021'>2021</option>
                                    <option value='2022'>2022</option>
                                    <option value='2023'>2023</option>
                                    <option value='2024'>2024</option>
                                    <option value='2025'>2025</option>
                                    <option value='2026'>2026</option>
                                    <option value='2027'>2027</option>
                                    <option value='2028'>2028</option>
                                    <option value='2029'>2029</option>
                                    <option value='2030'>2030</option>
                                    <option value='2031'>2031</option>
                                  </Field>
                                  <div className='text-danger'>
                                    <ErrorMessage name='cardExpiryYear' />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='col-md-4 fv-row'>
                              <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2'>
                                <span className='required'>CVV</span>
                                <i
                                  className='fas fa-exclamation-circle ms-2 fs-7'
                                  data-bs-toggle='tooltip'
                                  title='Enter a card CVV code'
                                ></i>
                              </label>

                              <div className='position-relative'>
                                <Field
                                  type='text'
                                  className='form-control form-control-solid'
                                  placeholder='CVV'
                                  name='cardCvv'
                                />
                                <div className='text-danger'>
                                  <ErrorMessage name='cardCvv' />
                                </div>

                                <div className='position-absolute translate-middle-y top-50 end-0 me-3'>
                                  <KTSVG
                                    path='/media/icons/duotune/finance/fin002.svg'
                                    className='svg-icon-2hx'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='d-flex flex-stack'>
                            <div className='me-5'>
                              <label className='fs-6 fw-bold form-label'>
                                Save Card for further billing?
                              </label>
                              <div className='fs-7 fw-bold text-gray-400'>
                                If you need more info, please check budget planning
                              </div>
                            </div>

                            <label className='form-check form-switch form-check-custom form-check-solid'>
                              <Field className='form-check-input' type='checkbox' />
                              <span className='form-check-label fw-bold text-gray-400'>
                                Save Card
                              </span>
                            </label>
                          </div>
                        </div>
                      </div> */}

                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <h1 className='fw-bolder text-dark mb-1'>Review and Submit!</h1>

                          <div className='text-muted fs-4'>
                            {file ? (
                              <img
                                //@ts-ignore
                                src={URL.createObjectURL(file)}
                                alt=''
                                className='w-50 mh-80px m-5'
                              />
                            ) : null}

                            <p>
                              <b>Name: </b>
                              {tokenName}
                            </p>
                            <p>
                              <b>Symbol: </b>
                              {symbol}
                            </p>
                            <p>
                              <b>Market Cap: </b>
                              {mCap}
                            </p>
                            <p>
                              <b>Contract Address: </b>
                              {contractAddress}
                            </p>
                            <p>
                              <b>Website link: </b>
                              {websiteLink}
                            </p>
                            <p>
                              <b>Chart Link: </b>
                              {chartlink}
                            </p>
                            <p>
                              <b>Discord Link: </b>
                              {discordLink}
                            </p>
                            <p>
                              <b>Telegram Link: </b>
                              {telegramLink}
                            </p>
                            <p>
                              <b>Description: </b>
                              <div style={{height: '150px', overflowY: 'scroll'}}>
                                {description}
                              </div>
                            </p>
                          </div>
                          <div className='form-check form-check-custom form-check-solid fs-5'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              checked={checkboxValue}
                              id='flexCheckDefault'
                              onChange={toggleCheckbox}
                            />
                            
                            <label className='form-check-label'>
                              I agree to {' '}
                              <a href='/terms-conditions' target='_blank'>
                                terms and conditions
                              </a>
                              .
                            </label>
                          </div>

                          {/* <div className='text-center px-4 py-15'>
                            <img
                              src={toAbsoluteUrl('/media/illustrations/sketchy-1/9.png')}
                              alt=''
                              className='w-70 mh-150px'
                            />
                          </div> */}
                        </div>
                      </div>

                      <div className='d-flex flex-stack pt-10'>
                        <div className='me-2'>
                          <button
                            onClick={prevStep}
                            type='button'
                            className='btn btn-lg btn-light-primary me-3'
                            data-kt-stepper-action='previous'
                          >
                            <KTSVG
                              path='/media/icons/duotune/arrows/arr063.svg'
                              className='svg-icon-4 me-1'
                            />
                            Back
                          </button>
                        </div>

                        <div>
                          <button type='submit' className='btn btn-lg btn-primary me-3'>
                            <span className='indicator-label'>
                              {stepper.current?.currentStepIndex !==
                                stepper.current?.totatStepsNumber! - 1 && 'Continue'}
                              {stepper.current?.currentStepIndex ===
                                stepper.current?.totatStepsNumber! - 1 && 'Submit'}
                              <KTSVG
                                path='/media/icons/duotune/arrows/arr064.svg'
                                className='svg-icon-3 ms-2 me-0'
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{fontFamily: 'inherit', fontWeight: 'bold'}}
      />
    </div>
  )
}

export {Main}
