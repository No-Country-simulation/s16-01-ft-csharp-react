import { Typography } from "@material-tailwind/react"
import ExpenseForm from "../components/forms/ExpenseForm"

export default function ExpensePage() {

  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[12rem]">
      <div className="min-w-[90%] flex items-start pt-5">
          <Typography variant="h6" color="black" >
            Resumen de pedidos
            </Typography>
      </div>
      <ExpenseForm />
    </div>
  )
}
