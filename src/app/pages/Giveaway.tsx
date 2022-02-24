/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {useState, useEffect} from 'react'
import {collection, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {app, db} from '../../firebase'
import {MixedWidget5} from '../../_metronic/partials/widgets'
import {PageTitle} from '../../_metronic/layout/core'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BallTriangle, Triangle, CradleLoader} from 'react-loader-spinner'
import {Formik, Form, FormikValues, Field, ErrorMessage} from 'formik'
import {KTSVG, toAbsoluteUrl} from '../../_metronic/helpers'
import * as Yup from 'yup'
import Particles from 'react-tsparticles'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  FooterRight,
} from '../../_metronic/partials/widgets'

type Props = {
  className: string
  color: string
  svgIcon: string
  iconColor: string
  title: string
  description: string
}

interface ICreateAccount {
  name: string
  email: string
}

const inits: ICreateAccount = {
  name: '',
  email: '',
}

const createAppSchema = [
  Yup.object({
    name: Yup.string().required().label('Your name'),
    email: Yup.string().required().label('Your email'),
  }),
]

const Giveaway: React.FC<Props> = ({className, color, svgIcon, iconColor, title, description}) => {
  const [currentSchema, setCurrentSchema] = useState(createAppSchema[0])
  const [initValues] = useState<ICreateAccount>(inits)

  const [name, setName] = useState('Pradeep')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)


  const submitStep = async (values: ICreateAccount, actions: FormikValues) => {
    setSubmitting(true)
    setName(values.name)
    setEmail(values.email)
    await fetch(
      'https://us-central1-yourcryptovoice-a9117.cloudfunctions.net/addGiveaway?name=' +
        values.name +
        '&email=' +
        values.email
    )
      .then((response) => {})
      .then((data) => {
        setSubmitted(true)
        setSubmitting(false)
        toast.success('🦄 Successfully submitted!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  const particlesInit = (main: any) => {
    console.log(main)

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  }

  const particlesLoaded = (container: any) => {
    console.log(container)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>GIVEAWAY!</PageTitle>
      <div className='row align-items-center'>
        <div
          className=''
          style={{
            backgroundImage: `url("https://cdn1.vectorstock.com/i/1000x1000/24/65/party-flags-with-confetti-and-ribbons-vector-25222465.jpg")`,
          }}
        >
          <div className='card-body d-flex flex-column pb-10 pb-lg-15 align-items-center'>
            <div className='flex-grow-1 mt-10 '>
              <Particles
                id='tsparticles'
                // init={particlesInit}
                // loaded={particlesLoaded}
                options={{
                  autoPlay: true,
                  background: {
                    color: {
                      value: 'white',
                    },
                    image: '',
                    position: '',
                    repeat: '',
                    size: '',
                    opacity: 1,
                  },
                  backgroundMask: {
                    composite: 'destination-out',
                    cover: {
                      color: {
                        value: '#fff',
                      },
                      opacity: 1,
                    },
                    enable: false,
                  },
                  fullScreen: {
                    enable: true,
                    zIndex: -1,
                  },
                  detectRetina: false,
                  duration: 0,
                  fpsLimit: 120,
                  interactivity: {
                    detectsOn: 'window',
                    events: {
                      onClick: {
                        enable: false,
                        mode: [],
                      },
                      //@ts-ignore
                      onDiv: {
                        selectors: [],
                        enable: false,
                        mode: [],
                        type: 'circle',
                      },
                      onHover: {
                        enable: false,
                        mode: [],
                        parallax: {
                          enable: false,
                          force: 2,
                          smooth: 10,
                        },
                      },
                      resize: true,
                    },
                    modes: {
                      attract: {
                        distance: 200,
                        duration: 0.4,
                        //@ts-ignore
                        easing: 'ease-out-quad',
                        factor: 1,
                        maxSpeed: 50,
                        speed: 1,
                      },
                      bounce: {
                        distance: 200,
                      },
                      bubble: {
                        distance: 200,
                        duration: 0.4,
                        mix: false,
                      },
                      connect: {
                        distance: 80,
                        links: {
                          opacity: 0.5,
                        },
                        radius: 60,
                      },
                      grab: {
                        distance: 100,
                        links: {
                          blink: false,
                          consent: false,
                          opacity: 1,
                        },
                      },
                      light: {
                        area: {
                          gradient: {
                            start: {
                              value: '#ffffff',
                            },
                            stop: {
                              value: '#000000',
                            },
                          },
                          radius: 1000,
                        },
                        shadow: {
                          color: {
                            value: '#000000',
                          },
                          length: 2000,
                        },
                      },
                      push: {
                        default: true,
                        groups: [],
                        quantity: 4,
                      },
                      remove: {
                        quantity: 2,
                      },
                      repulse: {
                        distance: 200,
                        duration: 0.4,
                        factor: 100,
                        speed: 1,
                        maxSpeed: 50,
                        //@ts-ignore
                        easing: 'ease-out-quad',
                      },
                      slow: {
                        factor: 3,
                        radius: 200,
                      },
                      trail: {
                        delay: 1,
                        pauseOnStop: false,
                        quantity: 1,
                      },
                    },
                  },
                  manualParticles: [],
                  motion: {
                    disable: false,
                    reduce: {
                      factor: 4,
                      value: true,
                    },
                  },
                  particles: {
                    bounce: {
                      horizontal: {
                        random: {
                          enable: false,
                          minimumValue: 0.1,
                        },
                        value: 0,
                      },
                      vertical: {
                        random: {
                          enable: false,
                          minimumValue: 0.1,
                        },
                        value: 0,
                      },
                    },
                    collisions: {
                      bounce: {
                        horizontal: {
                          random: {
                            enable: false,
                            minimumValue: 0.1,
                          },
                          value: 1,
                        },
                        vertical: {
                          random: {
                            enable: false,
                            minimumValue: 0.1,
                          },
                          value: 1,
                        },
                      },
                      enable: false,
                      mode: 'bounce',
                      overlap: {
                        enable: true,
                        retries: 0,
                      },
                    },
                    color: {
                      value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E'],
                      animation: {
                        h: {
                          count: 0,
                          enable: true,
                          offset: 0,
                          speed: 30,
                          sync: true,
                        },
                        s: {
                          count: 0,
                          enable: false,
                          offset: 0,
                          speed: 1,
                          sync: true,
                        },
                        l: {
                          count: 0,
                          enable: false,
                          offset: 0,
                          speed: 1,
                          sync: true,
                        },
                      },
                    },
                    destroy: {
                      //@ts-ignore
                      mode: 'none',
                      split: {
                        count: 1,
                        factor: {
                          random: {
                            enable: false,
                            minimumValue: 0,
                          },
                          value: 3,
                        },
                        rate: {
                          random: {
                            enable: false,
                            minimumValue: 0,
                          },
                          value: {
                            min: 4,
                            max: 9,
                          },
                        },
                        sizeOffset: true,
                      },
                    },
                    gradient: [],
                    groups: {},
                    life: {
                      count: 0,
                      delay: {
                        random: {
                          enable: false,
                          minimumValue: 0,
                        },
                        value: 0,
                        sync: false,
                      },
                      duration: {
                        random: {
                          enable: false,
                          minimumValue: 0.0001,
                        },
                        value: 0,
                        sync: false,
                      },
                    },
                    links: {
                      blink: false,
                      color: {
                        value: '#fff',
                      },
                      consent: false,
                      distance: 100,
                      enable: false,
                      frequency: 1,
                      opacity: 1,
                      shadow: {
                        blur: 5,
                        color: {
                          value: '#00ff00',
                        },
                        enable: false,
                      },
                      triangles: {
                        enable: false,
                        frequency: 1,
                      },
                      width: 1,
                      warp: false,
                    },
                    move: {
                      angle: {
                        offset: 0,
                        value: 90,
                      },
                      attract: {
                        distance: 200,
                        enable: false,
                        rotate: {
                          x: 3000,
                          y: 3000,
                        },
                      },
                      decay: 0.1,
                      distance: {},
                      direction: 'top',
                      drift: 0,
                      enable: true,
                      gravity: {
                        acceleration: 9.81,
                        enable: true,
                        inverse: false,
                        maxSpeed: 200,
                      },
                      path: {
                        clamp: true,
                        delay: {
                          random: {
                            enable: false,
                            minimumValue: 0,
                          },
                          value: 0,
                        },
                        enable: false,
                        options: {},
                      },
                      outModes: {
                        default: 'destroy',
                        bottom: 'bounce',
                        left: 'destroy',
                        right: 'destroy',
                        top: 'none',
                      },
                      random: false,
                      size: false,
                      speed: {
                        min: 50,
                        max: 150,
                      },
                      spin: {
                        acceleration: 0,
                        enable: false,
                      },
                      straight: false,
                      trail: {
                        enable: false,
                        length: 10,
                        fillColor: {
                          value: '#000000',
                        },
                      },
                      vibrate: false,
                      warp: false,
                    },
                    number: {
                      density: {
                        enable: false,
                        area: 800,
                        factor: 1000,
                      },
                      limit: 300,
                      value: 0,
                    },
                    opacity: {
                      random: {
                        enable: false,
                        minimumValue: 0.1,
                      },
                      value: 1,
                      animation: {
                        count: 0,
                        enable: false,
                        speed: 0.3,
                        sync: true,
                        destroy: 'min',
                        startValue: 'max',
                      },
                    },
                    orbit: {
                      animation: {
                        count: 0,
                        enable: false,
                        speed: 1,
                        sync: false,
                      },
                      enable: false,
                      opacity: 1,
                      rotation: {
                        random: {
                          enable: false,
                          minimumValue: 0,
                        },
                        value: 45,
                      },
                      width: 1,
                    },
                    reduceDuplicates: false,
                    repulse: {
                      random: {
                        enable: false,
                        minimumValue: 0,
                      },
                      value: 0,
                      enabled: false,
                      distance: 1,
                      duration: 1,
                      factor: 1,
                      speed: 1,
                    },
                    roll: {
                      darken: {
                        enable: true,
                        value: 30,
                      },
                      enable: true,
                      enlighten: {
                        enable: true,
                        value: 30,
                      },
                      mode: 'vertical',
                      speed: {
                        min: 15,
                        max: 25,
                      },
                    },
                    rotate: {
                      random: {
                        enable: false,
                        minimumValue: 0,
                      },
                      value: {
                        min: 0,
                        max: 360,
                      },
                      animation: {
                        enable: true,
                        speed: 60,
                        sync: false,
                      },
                      direction: 'random',
                      path: false,
                    },
                    shadow: {
                      blur: 0,
                      color: {
                        value: '#000000',
                      },
                      enable: false,
                      offset: {
                        x: 0,
                        y: 0,
                      },
                    },
                    shape: {
                      options: {
                        polygon: [
                          {
                            sides: 5,
                          },
                          {
                            sides: 6,
                          },
                        ],
                        character: [
                          {
                            value: ['💩', '🤡', '🍀', '🍙'],
                          },
                        ],
                      },
                      type: ['circle', 'square', 'polygon', 'character', 'character', 'character'],
                    },
                    size: {
                      random: {
                        enable: false,
                        minimumValue: 1,
                      },
                      value: 3,
                      animation: {
                        count: 0,
                        enable: false,
                        speed: 5,
                        sync: false,
                        destroy: 'none',
                        startValue: 'random',
                      },
                    },
                    stroke: {
                      width: 0,
                    },
                    tilt: {
                      random: {
                        enable: false,
                        minimumValue: 0,
                      },
                      value: {
                        min: 0,
                        max: 360,
                      },
                      animation: {
                        enable: true,
                        speed: 60,
                        sync: false,
                      },
                      direction: 'random',
                      enable: true,
                    },
                    twinkle: {
                      lines: {
                        enable: false,
                        frequency: 0.05,
                        opacity: 1,
                      },
                      particles: {
                        enable: false,
                        frequency: 0.05,
                        opacity: 1,
                      },
                    },
                    wobble: {
                      distance: 30,
                      enable: true,
                      speed: {
                        min: -15,
                        max: 15,
                      },
                    },
                    zIndex: {
                      random: {
                        enable: false,
                        minimumValue: 0,
                      },
                      value: 0,
                      opacityRate: 1,
                      sizeRate: 1,
                      velocityRate: 1,
                    },
                  },
                  pauseOnBlur: true,
                  pauseOnOutsideViewport: true,
                  responsive: [],
                  style: {},
                  themes: [],
                  zLayers: 100,
                  emitters: {
                    autoPlay: true,
                    fill: true,
                    life: {
                      wait: false,
                    },
                    rate: {
                      quantity: 10,
                      delay: 0.1,
                    },
                    shape: 'square',
                    startCount: 0,
                    size: {
                      mode: 'percent',
                      height: 0,
                      width: 0,
                    },
                    position: {
                      x: 50,
                      y: 100,
                    },
                  },
                }}
              />

              <div className='card card-xl-stretch mb-5 mb-xl-8 m-3 p-10'>
                <div className='card-body d-flex flex-column pb-10 pb-lg-15 '>
                  <div className='d-flex align-items-center pe-2 mb-8'>
                    <span
                      className='text-center fw-bolder fs-2 flex-grow-1 m-1'
                      style={{
                        textDecoration: 'underline',
                      }}
                    >
                      GIVEAWAY SIGNUP
                    </span>
                  </div>
                  {!submitted ? (
                    <>
                      <div className='d-flex align-items-center pe-2 mb-8'>
                        <span className='text-center fs-6 flex-grow-1 m-1'>
                          Congratulations! You are eligible for yourcryptovoice launch giveaway.
                          Please submit your details to claim.
                        </span>
                      </div>

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
                                    <span className='required'>Name</span>

                                    <i
                                      className='fas fa-exclamation-circle ms-2 fs-7'
                                      data-bs-toggle='tooltip'
                                      title='Specify your name'
                                    ></i>
                                  </label>

                                  <Field
                                    type='text'
                                    className='form-control form-control-lg form-control-solid'
                                    name='name'
                                    placeholder=''
                                  />
                                  <div className='text-danger'>
                                    <ErrorMessage name='name' />
                                  </div>
                                </div>
                                <div className='fv-row mb-10'>
                                  <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                                    <span className='required'>Email</span>
                                    <i
                                      className='fas fa-exclamation-circle ms-2 fs-7'
                                      data-bs-toggle='tooltip'
                                      title='Specify your email'
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

                                <div>{
                                  submitting ? 
                                  <button disabled type='submit' className='btn btn-lg btn-primary me-3'>
                                    <span className='indicator-label'>Please wait...</span>
                                  </button>
                                  :
                                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                                    <span className='indicator-label'>Submit</span>
                                  </button>
                                  }
                                  
                                </div>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </>
                  ) : (
                    <div className='text-center'>
                      Congratulations {name}! We will soon contact you with the giveaway. Keep
                      browsing www.yourcryptovoice.com for more.
                      <br />
                      <br />
                      <button
                        className='btn btn-lg btn-secondary me-3'
                        onClick={() => {
                          setSubmitted(false)
                        }}
                      >
                        go back
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' hideViewAllButton={true} /> */}
      </div>
    </>
  )
}

export {Giveaway}
