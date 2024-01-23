import React, {useContext} from 'react';
import { AuthContext } from '../../store/auth-context';

const AccountInfo = () => {
    const {user} = useContext(AuthContext);

    return (
        <section className='mx-auto max-w-[600px]  p-5 my-2 bg-white rounded-xl'>
            <header>
                <h3 className='px-2 pb-2 text-center font-[400] text-slate-700 text-lg'>Account Info:</h3>
            </header>
        <div className='w-full '>
            <div className='flex items-center p-2 w-full border-b border-b-slate-300'>
                <h5 className='font-[600] text-slate-700 text-sm mr-5'>User Name:</h5>
                <p className='font-[500] text-slate-500 text-sm mr-5'>{user.displayName}</p>
            </div>
            <div className='flex w-full border-b border-b-slate-300 p-2'>
                <h5 className='font-[600] text-slate-700 text-sm mr-5'>User e-mail:</h5>
                <p className='font-[500] text-slate-500 text-sm mr-5'>{user.email}</p>
            </div>
        </div>
        </section>
    )

}

export default AccountInfo;