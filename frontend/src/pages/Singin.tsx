import { Quote } from "../components/Quotes"
import { InputForm } from "../components/InputForm"

export const Singin = () => {
    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
            <div>
                <InputForm />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    )
}