import Image from 'next/image';
import HelloWorld from '@/components/HelloWorld';
import { LoginForm } from '@/components/login-form';
import React, { useEffect } from 'react';

useEffect(() => {
    console.log('Hello World');
    return () => {  
        console.log('Goodbye World');
    }
}

const App: React.FC = () => {
    return (
        <div>
            <LoginForm/>
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />

            <Image src="/globe.svg" width={30} height={40} alt="file" />
        </div>
    );
}

export default App;