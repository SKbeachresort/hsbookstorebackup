"use client";
import React from 'react';
import { getUserDetails } from '@/hooks/getUser';

const MyProfilePage = () => {

  const { user, loading, error } = getUserDetails();

  return (
    <div>
        <h1 className='my-3 text-lg font-semibold text-center'>
           This is My Profile Page44
        </h1>
        <p className='text-center my-2'>{user?.firstName}{" "}{user?.lastName}</p>
    </div>
  );
};

export default MyProfilePage;