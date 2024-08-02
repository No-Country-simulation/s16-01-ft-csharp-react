import { Button } from "@material-tailwind/react";

interface SettingsButtonProps {
  handleOpen?: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ handleOpen }) => {
  return (
    <Button onClick={handleOpen} className="h-[2.5rem] w-[3.25rem] border-[1px] border-blue-gray-900 flex items-center justify-center rounded p-0" variant="text">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-[1.25rem] w-[1.25rem]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
      />
    </svg>
  </Button>
  )
}
