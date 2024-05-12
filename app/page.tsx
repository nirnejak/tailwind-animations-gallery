import * as React from "react"
import { type Metadata } from "next"

import generateMetadata from "utils/seo"

import AnimationGallery from "components/AnimationGallery"
import Footer from "@/components/Footer"

export const metadata: Metadata = generateMetadata({
  path: "/",
  title: "Next.js App",
  description:
    "A gallery of TailwindCSS animations that you can just copy-paste into your projects",
})

const Home: React.FC = () => {
  return (
    <>
      <main className="grid h-screen place-content-center">
        <h1 className="text-center text-xl font-medium text-zinc-300">
          <AnimationGallery />
        </h1>
      </main>
      <Footer />
    </>
  )
}

export default Home
