import React from 'react';
import { useState } from 'react';

import './index.css'

export default function App() {
  const [deta, setDeta] = useState({
    uname: '',
    uemail: '',
    unumber: '',
    upassword: ''
  });
  
  const [array, setArray] = useState([]);
  const [ubdatecheck, setUbdatecheck] = useState(false);
  const [chanking, setChecking] = useState(true);
  const [indexss, setIndex] = useState(-1);

  function detasubmit(event) {
    alert(ubdatecheck ? 'Record updated successfully!' : 'Record added successfully!')
    event.preventDefault();
    const filter = array.filter((item, i) => {
      return item.uemail === deta.uemail && i !== indexss;
    });

    if(ubdatecheck) {
      if(filter.length === 0) {
        array[indexss].uname = deta.uname;
        array[indexss].uemail = deta.uemail;
        array[indexss].unumber = deta.unumber;
        array[indexss].upassword = deta.upassword;
        setArray([...array]);
        setChecking(true);
        setUbdatecheck(false);
        setDeta({
          uname: '',
          uemail: '',
          unumber: '',
          upassword: ''
        });
      } else {
        toast.error('Email already exists!');
      }
    } else {
      const filter = array.filter((item) => {
        return item.uemail === deta.uemail;
      });
   
      if(filter.length === 1) {
        toast.error('Email already exists!');
      } else {
        array.push({...deta});
        setArray([...array]);
        setDeta({
          uname: '',
          uemail: '',
          unumber: '',
          upassword: ''
        });
      }
    }
  }

  function handledeta(e) {
    const { name, value } = e.target;
    setDeta(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function deleteDeta(index) {
    const notify = () => toast.success('Record deleted successfully!');
    let han = array.filter((item, i) => {
      return i !== index;
    });
    setArray([...han]);
    notify();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br  p-4 md:p-8">
      <div className="max-w-10xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
              User Management Dashboard
            </span>
          </h1>
          {array.length > 0 && (
            <span className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
              {array.length} {array.length === 1 ? 'record' : 'records'}
            </span>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Form */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-sm border border-gray-200 min-h-[550px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              {chanking ? '➕ Add New User' : '✏️ Update User'}
            </h2>
            
            <form onSubmit={detasubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  onChange={handledeta}
                  name='uname'
                  value={deta.uname}
                  placeholder='muhammad huzaifa'
                  className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={deta.uemail}
                  onChange={handledeta}
                  name='uemail'
                  placeholder='huzaifabusiness60@gmail.com'
                  className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="number"
                  value={deta.unumber}
                  onChange={handledeta}
                  name='unumber'
                  placeholder='0321892712'
                  className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={deta.upassword}
                  onChange={handledeta}
                  name='upassword'
                  placeholder='••••••••'
                  className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button 
                type='submit' 
                className={`w-full py-3 px-5 rounded-md text-white font-medium transition-colors ${chanking ? 'bg-teal-600 hover:bg-teal-700' : 'bg-purple-600 hover:bg-purple-700'}`}
              >
                {chanking ? 'Add User' : 'Update User'}
              </button>
            </form>
          </div>
          
   
          <div className="w-500">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">
                  {array.length === 0 ? 'No Users Yet' : 'User Records'}
                </h2>
              </div>
              
              {array.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-700">No users found</h3>
                  <p className="mt-1 text-sm text-gray-500">Add your first user using the form</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">password</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {array.map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                                <span className="text-teal-600 font-medium">
                                  {item.uname.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{item.uname}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.uemail}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{'*'.repeat(item.upassword.length)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.unumber}</td>

                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => {
                                  setDeta({
                                    uname: array[i].uname,
                                    uemail: array[i].uemail,
                                    unumber: array[i].unumber,
                                    upassword: array[i].upassword
                                  });
                                  setUbdatecheck(true);
                                  setIndex(i);
                                  setChecking(!chanking);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="text-indigo-600 hover:text-indigo-900 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteDeta(i)}
                                className="text-red-600 hover:text-red-900 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
