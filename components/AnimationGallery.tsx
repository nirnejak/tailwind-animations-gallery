"use client"
import * as React from "react"

import { animations } from "@/utils/animations"

import ColorSelector from "./atoms/ColorSelector"
import { IColorVariants } from "./atoms/Button"
import Input from "./atoms/Input"

import AnimationCard from "./AnimationCard"
import Container from "./Container"
import { Search } from "akar-icons"

interface Props {}

const AnimationGallery: React.FC<Props> = () => {
  const [color, setColor] = React.useState<IColorVariants>("violet")
  const [search, setSearch] = React.useState("")

  return (
    <Container>
      <div>
        <ColorSelector color={color} setColor={setColor} />
        <div className="mt-5">
          <Input
            type="text"
            id="search-input"
            placeholder="Search Animation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={15} />}
          />
        </div>
        <div className="grid grid-cols-5 gap-3 mt-5">
          {animations
            .filter((animation) =>
              animation.title
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
            .map((animation) => (
              <AnimationCard
                color={color}
                title={animation.title}
                animationClass={animation.animationClass}
              />
            ))}
        </div>
      </div>
    </Container>
  )
}

export default AnimationGallery
