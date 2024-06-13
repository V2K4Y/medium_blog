import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { BACKEND_URL } from "../Config";
import { SingupInput } from "@v_k_y/medium-common";
import { useNavigate } from "react-router-dom";

export const InputForm = () => {

    const [state, setState] = useState('Signin');
    const [load, setLoad] = useState(false);
    const [postInputs, setPostInputs] = useState<SingupInput>({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleState = () => {
        state == 'Signin' ? setState('Signup') : setState('Signin');
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoad(true);
            postInputs.name == '' ? postInputs.name = 'vivek' : null;
            const res = await axios.post(BACKEND_URL + `/user${state == 'Signin'? '/signin' : '/signup'}`, postInputs)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('name', res.data.user.name);
            localStorage.setItem('email', res.data.user.email);
            navigate('/blogs');
        } catch (error) {
            alert("Something went wrong!")
            console.log(error);
            setLoad(false);
        }
    }

    return (
        <div className="col-span-1 h-screen bg-gray-100 flex justify-center items-center relative">
            <div className="flex flex-col gap-10 p-10 w-3/5 rounded-md justify-center items-center">
                <div className="text-center">
                    <p className="text-3xl font-bold pb-3">{state == 'Signup' ? 'Create an account': 'Login to your account'}</p>
                    {state == 'Signin' 
                    ? <p className="text-gray-500">Don't have account?&nbsp;
                        <span className="underline cursor-pointer" onClick={handleState}>SignUp</span>
                    </p> 
                    : <p className="text-gray-500"> Already have account?&nbsp; 
                        <span className="underline cursor-pointer" onClick={handleState}>Login</span>
                    </p>}
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className={state == 'Signin' ? "hidden" : ''}>
                        <Input name={postInputs.name} onChange={(e) => (
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    )} label='Name' placeholder = "Vivek Kumar"/>
                    </div>
                    <Input name={postInputs.email} onChange={(e) => (
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    )} label='Email' placeholder="example@gmail.com" />
                    <Input name={postInputs.password} onChange={(e) => (
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    )} label='Password' placeholder="^%$65Ggu&%88" />
                    <button
                        type="submit"
                        className="bg-black/70 hover:bg-black w-full text-white font-bold mt-5 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                    >
                        {state == 'Signin' ? 'Login' : 'Register'}
                    </button>
                </form>
            </div>
            {
                load ? 
                <div className="h-screen w-screen absolute top-0 left-0 bg-black/50 flex justify-center items-center">
                    <Spinner radius={10}/>
                </div>:
            null
            }
            <div className="absolute top-2 left-5 cursor-pointer" onClick={() => (navigate('/'))}>
                <p className="font-bold text-2xl">Medium</p>
            </div>
        </div>
    )
}

interface Props {
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder: string;
}

const Input = ({name, onChange, label, placeholder}: Props) => {
    return (
        <div className="mb-4">
           <label htmlFor={label.toLowerCase()} className="block text-gray-700 text-sm font-bold mb-2">
              {label}:
              </label>
              <input
                type={label == 'Password' ? "password" : "text"}
                placeholder={placeholder}
                id={label.toLowerCase()}
                name={label.toLocaleLowerCase()}
                value={name}
                required={label == 'Name' ? false : true}
                onChange={onChange}
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-300 focus:outline-none focus:shadow-outline bg-gray-50"
            />
        </div>
    )
}

export function Spinner ({radius = 6, color = 'white'}: {radius?: number, color?: string}) {
    return (
        <div role="status">
            <svg className={`h-${radius} w-${radius} animate-spin text-${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    )
}