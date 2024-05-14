import * as React from "react"

import { highlight } from "sugar-high"
import { Copy, Telescope } from "akar-icons"
import * as ToggleGroup from "@radix-ui/react-toggle-group"

import { IAnimation } from "@/utils/animations"
import copyToClipboard from "@/utils/copyToClipboard"

import Button, { IColorVariants } from "./atoms/Button"
import classNames from "@/utils/classNames"

interface Props {
  animation: IAnimation
  color: IColorVariants
  onClose: () => void
}

const allModifiers = ["hover", "active", "focus"]

const AnimationDetailsModal: React.FC<Props> = ({
  animation,
  color,
  onClose,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keyup", handleKeyDown)
    return () => {
      window.removeEventListener("keyup", handleKeyDown)
    }
  }, [])

  const code = React.useMemo(() => {
    const config = {
      keyframes: {
        ...animation.tailwindKeyframesProperty,
      },
      animation: {
        ...animation.tailwindAnimationProperty,
      },
    }
    return JSON.stringify(config, null, 4)
  }, [animation])
  const codeHTML = highlight(code)

  const [modifiers, setModifiers] = React.useState<string[]>([])

  const isAlwaysEnabled = React.useMemo(
    () => modifiers.length === 0,
    [modifiers]
  )

  const handleCardClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div
      className="fixed left-0 top-0 z-max h-screen w-full bg-zinc-900/30 backdrop-blur-lg grid place-content-center"
      onClick={onClose}
    >
      <div
        className="bg-zinc-800 rounded-xl p-5 w-[1080px]"
        onClick={handleCardClick}
      >
        <div className="mb-3">{animation.title}</div>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="rounded-xl bg-zinc-900 text-center px-18 pb-20 pt-24 relative ">
              <Button variant={color} className={animation.animationClass}>
                Click Me
              </Button>
              <p className="text-zinc-600 absolute left-1/2 bottom-3 -translate-x-1/2 text-sm flex items-center gap-1">
                <span>Preview</span>
                <span>
                  <Telescope size={14} />
                </span>
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex gap-2 mb-2">
              <button
                className={classNames(
                  isAlwaysEnabled ? "bg-zinc-900" : "bg-zinc-700",
                  "hover:bg-zinc-950 py-3 px-6 text-base leading-4 rounded-lg focus:outline-none"
                )}
                onClick={() => setModifiers([])}
              >
                Always
              </button>
              <ToggleGroup.Root
                className="inline-flex rounded space-x-px"
                type="multiple"
                value={modifiers}
                onValueChange={setModifiers}
                aria-label="Button Themes"
              >
                {allModifiers.map((modifier, index) => (
                  <ToggleGroup.Item
                    key={index}
                    className="hover:bg-zinc-950 data-[state=on]:bg-zinc-900 flex p-3 items-center justify-center bg-zinc-700 text-base leading-4 first:rounded-l-lg last:rounded-r-lg focus:z-10 focus:outline-none"
                    value={modifier}
                    aria-label={`${modifier}`}
                    title={modifier}
                  >
                    <div className="capitalize px-3">{modifier}</div>
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>
            <div className="relative bg-zinc-900 px-3 py-1 mt-auto mb-2 rounded-md">
              <pre className="max-h-[300px] overflow-auto">
                <code
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: codeHTML }}
                />
              </pre>
              <button
                className="rounded p-2 absolute top-2 right-2 text-zinc-300 hover:bg-zinc-950 hover:text-zinc-200 focus:bg-zinc-950 focus:outline-none"
                onClick={() => copyToClipboard(animation.animationClass)}
              >
                <Copy size={16} />
              </button>
            </div>
            <code className="bg-zinc-900 pl-3 py-1 pr-1 flex items-center justify-between rounded-md text-sm">
              {modifiers.length
                ? modifiers.map(
                    (modifier) => `${modifier}:${animation.animationClass} `
                  )
                : animation.animationClass}
              <button
                className="rounded p-2 text-zinc-300 hover:bg-zinc-950 hover:text-zinc-200 focus:bg-zinc-950 focus:outline-none"
                onClick={() => copyToClipboard(animation.animationClass)}
              >
                <Copy size={16} />
              </button>
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimationDetailsModal
