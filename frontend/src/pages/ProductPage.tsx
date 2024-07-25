import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[6.5rem]">
      ProductPage - { id }
    </div>
  )
}
