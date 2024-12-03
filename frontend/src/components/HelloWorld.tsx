"use client";

import React, {useState} from 'react';

type HelloWorlProps = {
    name? : string;
}

const HelloWorld: React.FC<HelloWorlProps> = ({name}) => {

    const [counter, setCounter] = React.useState<number>(0);
    return (
        <div>
            <h1>Hello {name}</h1>
            <p>Counter : {counter} </p>
            <button onClick={() => setCounter(counter + 1)}>Click me</button>
        </div>
    );
}

export default HelloWorld;