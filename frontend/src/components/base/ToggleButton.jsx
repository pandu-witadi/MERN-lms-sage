import React, {useState} from 'react';

export default function ToggleButton({width, label, id, value, setToggle}) {
    const handleToggle = () => {
        setToggle(id);
    };

    return (
        <button onClick={handleToggle}
                className={`btn btn-sm ${width ? `w-[${width}px]` : `w-[160px]`} rounded-xl ${(value === id) ? 'btn-warning bg-app-base border-app-border' : 'btn-neutral'}`}>
            {label}
        </button>
    );
}
