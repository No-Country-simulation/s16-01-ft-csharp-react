import { Button } from "@material-tailwind/react";

export default function GlassButton() {
  return (
    <Button
            size="sm"
            color="black"
            className="!absolute right-1 top-1 rounded h-[2rem] w-[2.625rem] flex items-center justify-center bg-[#787A00]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Button>
  )
}
