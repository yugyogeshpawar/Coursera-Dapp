import Head from "next/head"
import Link from "next/link"

import { useState, useEffect } from "react"
import { BaseLayout } from "@components/layout"
import { CourseinProfessionalCertificates, CourseHero, WhatisProfessionalCertificate, TopBars, CourseTopBar, WhatYouWillLearn, SideBar, AboutProCertificate, Instructor, FAQ } from "@components/ui/coursePage"
import { ModelView } from "@components/ui/common"


export const getServerSideProps = async (context) => {

    const { slug } = context.query
    const res = await fetch(`http://localhost:3000/api/blog?slug=${slug}`)
    const parsed = await res.json()
    const HeroProps = await parsed.hero
    const courseProps = await parsed.course

    return {
        props: { HeroProps, courseProps }
    }
}

function Course({ HeroProps, courseProps }) {

    if (courseProps) {

        const [Hero, setHero] = useState(HeroProps)
        const [course, setcourse] = useState(courseProps)

        const [coursePopTitle, setCoursePopTitle] = useState(false)

        const [offset, setOffset] = useState(0)
        const [offset2, setOffset2] = useState("hidden")
        const [offSetMob, setOffSetMob] = useState("hidden")

        const showModel = () => {

            setCoursePopTitle(Hero.Heading)
        }

        useEffect(() => {
            setOffset2(offset >= 750 ? "lg:fixed" : "lg:hidden")
            setOffSetMob(offset >= 780 ? "fixed" : "hidden")
        }, [offset])

        useEffect(() => {
            const onScroll = () => setOffset(window.pageYOffset)
            // clean up code
            window.removeEventListener('scroll', onScroll)
            window.addEventListener('scroll', onScroll, { passive: true })
            return () => window.removeEventListener('scroll', onScroll)
        }, [])

        const onsubmit = (order, course) => {
            console.log(order, course)
        }



        return (
            <div className="relative flex justify-center flex-col ">
                <Head>
                    <title>{Hero.Heading}</title>
                    <meta name="description" content="Coursera D_app" />
                    <link rel="icon" href="/favicon-v2-16x16.png" />
                </Head>
                <div className="h-16"></div>
                <CourseHero Hero={Hero} Course={course} handleOpen={showModel} />

                <div className={` z-[60] bg-white w-full top-0 ${offset2} ${offSetMob} items-center   `}>
                    <CourseTopBar Hero={Hero} className={"hidden lg:flex flex-col"}
                        handleOpen={showModel} />
                    <TopBars />
                </div>
                <div className={` z-[60]  bg-white w-full bottom-0 ${offSetMob} 
                items-center whitespace-nowrap overflow-hidden flex lg:hidden`} ><CourseTopBar Hero={Hero}
                        handleOpen={() => setCoursePopTitle(Hero.Heading)} /> </div>
                <div><TopBars /></div>
                <div id="about" className="pb-4"></div>
                <div className="w-full flex justify-center flex-col">
                    <div className=" md:px-8 max-w-7xl my-6 w-full grid place-content-start grid-cols-1 lg:grid-cols-3 m-auto">
                        <div className="flex items-center lg:mx-4 py-5 flex-col flex-wrap col-span-2">
                            <WhatYouWillLearn /> <AboutProCertificate />
                        </div> <SideBar />
                    </div>
                    <div className=" lg:h-28" id="whatisprocer"></div>
                    <div ><WhatisProfessionalCertificate /></div>
                    <div className=" lg:h-12" id="course"></div>
                    <div className="divider w-full my-10 md:my-16 h-px border border-gray-300"></div>
                    <div ><CourseinProfessionalCertificates /></div>
                    <div className=" lg:h-28 h-16" id="instructor"></div>
                    <Instructor /> <div className="h-10 lg:h-28" id="faq"></div> <div ><FAQ /></div>
                </div>
                {/* extra div for adding css  */}
                <div className="w-0 h-0 bg-gradient-to-r from-[#1F70C1] to-[#000000] text-black 
                last:bg-[#2B2B33] bg-[#FBBC05] lg:bg-black  ">
                    <div className="h-0 w-0 bg-[#1C2B33] "></div>
                </div>
                <ModelView coursePopTitle={coursePopTitle}
                    onClose={() => setCoursePopTitle(false)}
                    onSubmit={onsubmit}
                />
            </div>
        )
    }
    return (
        <div className='text-6xl w-full h-screen flex justify-center items-center cursor-pointer flex-col'>
            <div>No such Page availble right now</div>
            <Link href={`/`}>
                <div className="hover:underline my-5 text-4xl text-blue-700 ">Home</div>
            </Link>
        </div >
    )
}
export default Course

Course.Layout = BaseLayout