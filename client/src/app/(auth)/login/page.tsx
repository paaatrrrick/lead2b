'use client';
import React, { useState, useEffect, FormEvent } from 'react';
import Auth from '../auth';

export default function Login() {
    return <Auth isLogin={true}/>
}


