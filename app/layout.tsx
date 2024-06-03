import * as React from "react"

import type { Viewport } from "next"

import localFont from "next/font/local"

import Container from "components/Container"
import FeedbackWidget from "components/FeedbackWidget"
import Footer from "components/Footer"
import Header from "components/Header"
import classNames from "utils/classNames"

import "../styles/main.css"

const sansFont = localFont({
  variable: "--sans-font",
  src: [
    {
      path: "../fonts/GeneralSans-Variable.ttf",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-VariableItalic.ttf",
      style: "italic",
    },
  ],
})

export const viewport: Viewport = {
  themeColor: "#000000",
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="tw-animations.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>

      <body
        className={classNames(
          sansFont.variable,
          "overflow-x-hidden bg-zinc-900 text-zinc-400 font-sans"
        )}
      >
        <div className="bg-violet-500 p-3 text-xs text-white">
          <Container className="text-center">
            This project is still in development. Please take a minute to submit
            your feedback!
          </Container>
        </div>
        <Header />
        {children}
        <Footer />

        <FeedbackWidget />
      </body>
    </html>
  )
}

export default RootLayout
