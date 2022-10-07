import React, { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserType } from "./interface/interface";
const Add: FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const schema = yup
    .object()
    .shape({
      fio: yup.string().required('F.I.O kiriting!'),
      username: yup.string().required("Username kiriting!"),
      email: yup.string().email("Emailni to'g'ri kiriting!").required("Email kiriting!"),
      password: yup.string().min(8, "Parol kamida 8ta belgidan iborat bo'lsin!").max(20, "Parol ko'pi 20ta belgidan iborat bo'lsin!").required("Parol kiriting!"),
      confirmPassword: yup.string().min(8, "Parol kamida 8ta belgidan iborat bo'lsin!").max(20, "Parol ko'pi 20ta belgidan iborat bo'lsin!").oneOf([yup.ref('password'), null], "Parolni to'g'ri tering!")
    })
    .required();
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = getValues();
  const sendData = (data: any) => {
    if (id) {
      setUsers(users => users.map(item => item.id === id ? data : item))
    } else {
      setUsers([...users, { id: new Date().getTime(), ...data }])
    }
    setTab(false)
    for (let key in data) {
      resetField(key)
    }
  }
  console.log(errors);
  const [focus, setFocus] = useState(false)
  const inputFoucus = () => {
    setFocus(true)
  }

  const [tab, setTab] = useState(false);
  const userEdit = (data: any): void => {
    for (let key in data) {
      setValue(key, data[key], {
        shouldValidate: true,
      });
    }
    setTab(true);
  }
  const userDelete = (id:number):void=>{
    setUsers(users => users.filter(item => item.id !== id ))
  }
  return <div className=" w-full text-center w-[1200px] block m-auto">
    {tab ?
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-center text-xl m-5 ">{
            getValues().id ? "Users Edit" : "Users Add"
          }</h1>
          <button onClick={() => {
            if (getValues()) {
              for (let key in getValues()) {
                resetField(key)
              }
            }

            setTab(false)
          }} className="bg-blue-500 hover:blue-red-700 inline-block  m-1 text-white font-bold py-2 px-4 rounded duration-100 block m-auto">Qo'shish</button>
        </div>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit(sendData)} className=" w-[400px]  p-2 border border-[1px] rounded-[5px]">
            <div className="p-1 my-3">
              <label htmlFor="fio" className="text-lg">F.I.O</label>
              <input type="text"
                className={`p-3 w-full   border border-[1px] rounded-[5px] outline-none ${errors.fio?.message?.toString() ? 'border-[red]' : ''} `} placeholder="Ism"
                {...register('fio')}
                name='fio'
              />
              <span className="text-sm text-[red]">{errors.fio?.message?.toString()}</span>
            </div>
            <div className="p-1 my-3">
              <label htmlFor="name" className="text-lg">Login</label>
              <input
                type="text"
                className={`p-3 w-full   border border-[1px] rounded-[5px] outline-none ${errors.username?.message?.toString() ? 'border-[red]' : ''} `}
                placeholder="Login"
                {...register('username')}
                name='username'
              />
              <span className="text-sm text-[red]">{errors.username?.message?.toString()}</span>
            </div>
            <div className="p-1 my-3">
              <label htmlFor="name" className="text-lg">Email</label>
              <input
                type="text"
                className={`p-3 w-full   border border-[1px] rounded-[5px] outline-none ${errors.email?.message?.toString() ? 'border-[red]' : ''} `}
                placeholder="Email"
                {...register('email')}
                name='email' />
              <span className="text-sm text-[red]">{errors.email?.message?.toString()}</span>
            </div>
            <div className="p-1 my-3">
              <label htmlFor="name" className="text-lg">Parol</label>
              <input
                type="text"
                className={`p-3 w-full   border border-[1px] rounded-[5px] outline-none ${errors.password?.message?.toString() ? 'border-[red]' : ''} `}
                placeholder="Qayta parol"
                {...register('password')}
                name='password'
              />
              <span className="text-sm text-[red]">{errors.password?.message?.toString()}</span>
            </div>
            <div className="p-1 my-3">
              <label htmlFor="name" className="text-lg">Qayta Parol</label>
              <input
                type="text"
                className={`p-3 w-full   border border-[1px] rounded-[5px] outline-none ${errors.confirmPassword?.message?.toString() ? 'border-[red]' : ''} `}
                placeholder="Qayta parol"
                {...register('confirmPassword')}
                name='confirmPassword'
              />
              <span className="text-sm text-[red]">{errors.confirmPassword?.message?.toString()}</span>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-100 block m-auto">Qo'shish</button>
          </form>
        </div>
      </div> :
      <div className="w-[1200px] block m-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-center text-xl m-5 ">Users CRUD</h1>
          <button onClick={() => {
            if (getValues()) {
              for (let key in getValues()) {
                resetField(key)
              }
            }
            setTab(true)
          }} className="bg-blue-500 hover:blue-red-700 inline-block  m-1 text-white font-bold py-2 px-4 rounded duration-100 block m-auto">Qo'shish</button>
        </div>
        <table className="border border-[1px] w-full">
          <tbody>
            <th className="p-2 border-collapse border border-[1px]">#</th>
            <th className="p-2 border-collapse border border-[1px]">F.I.O</th>
            <th className="p-2 border-collapse border border-[1px]">Email</th>
            <th className="p-2 border-collapse border border-[1px]">Login</th>
            <th className="p-2 border-collapse border border-[1px]">Password</th>
            <th className="p-2 border-collapse border border-[1px]">Action</th>
          </tbody>
          <tbody>
            {
              users.map((data: UserType, i: number) => {
                const { id, fio, username, email, password } = data;
                return (
                  <tr key={i}>
                    <td className="p-2 border-collapse border border-[1px]">{i + 1}</td>
                    <td className="p-2 border-collapse border border-[1px]">{fio}</td>
                    <td className="p-2 border-collapse border border-[1px]">{username}</td>
                    <td className="p-2 border-collapse border border-[1px]">{email}</td>
                    <td className="p-2 border-collapse border border-[1px]">{password}</td>
                    <td className="p-2 border-collapse border border-[1px]">
                      <button className="bg-blue-500 hover:bg-blue-700 inline-block m-1 text-white font-bold py-2 px-4 rounded duration-100 block m-auto" onClick={() => userEdit(data)}  >edit</button>
                      <button className="bg-red-500 hover:bg-red-700 inline-block  m-1 text-white font-bold py-2 px-4 rounded duration-100 block m-auto" onClick={()=>userDelete(id)}>delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    }
  </div>;
};

export default Add;
