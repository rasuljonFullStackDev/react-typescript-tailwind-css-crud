import React, { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const Add: FC = () => {
  const schema = yup
    .object()
    .shape({
      fio: yup.string().required('F.I.O kiriting!'),
      username: yup.string().required("Username kiriting!"),
      email: yup.string().email().required("Email kiriting!"),
      password: yup.string().email().required("Email kiriting!"),
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
    defaultValues: {
      parent: null,
    },
  });
  const sendData = (data:any) => {
    console.log(data);

  }
  console.log(errors);
  
  return <div className=" w-full">
    <h1 className="text-center text-xl m-5 ">Foydalanuvchi qo'shish</h1>
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(sendData)} className=" w-[400px]  p-2 border border-[1px] rounded-[5px]">
        <div className="p-1 my-3">
          <label htmlFor="fio" className="text-lg">F.I.O</label>
          <input type="text" className="p-3 w-full  border border-[1px] rounded-[5px] outline-none border-rose-50" placeholder="Ism"      {...register('parent')} name='fio' />
          <span className="text-sm text-[red]">Xato</span>
        </div>
        <div className="p-1 my-3">
          <label htmlFor="name" className="text-lg">Login</label>
          <input type="text" className="p-3 w-full  border border-[1px] rounded-[5px] outline-none border-rose-50-" placeholder="Login"     {...register('parent')}/>
          <span className="text-sm text-[red]">Xato</span>
        </div>
        <div className="p-1 my-3">
          <label htmlFor="name" className="text-lg">Email</label>
          <input type="text" className="p-3 w-full  border border-[1px] rounded-[5px] outline-none border-rose-50-" placeholder="Email"    {...register('parent')} />
          <span className="text-sm text-[red]">Xato</span>
        </div>
        <div className="p-1 my-3">
          <label htmlFor="name" className="text-lg">Parol</label>
          <input type="text" className="p-3 w-full  border border-[1px] rounded-[5px] outline-none border-rose-50-" placeholder="Qayta parol"    {...register('parent')} />
          <span className="text-sm text-[red]">Xato</span>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-100 block m-auto">Qo'shish</button>
      </form>
    </div>

  </div>;
};

export default Add;
