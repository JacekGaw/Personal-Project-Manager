import React, {useEffect, useRef, useState} from 'react';

const ProgressBar = ({todos, className}) => {
    const [active, setActive] = useState(0);
    const [done, setDone] = useState(0);
    const [urgent, setUrgent] = useState(0);

    const barRef = useRef();
    let barW = 0;
    
    const todosLen = todos.length;

    useEffect(() => {
        barW = barRef.current.offsetWidth;
        setUrgent(((todos.filter(todo => todo.status === 'urgent').length)/todos.length)*barW);
        setActive(((todos.filter(todo => todo.status === 'active').length)/todos.length)*barW);
        setDone(((todos.filter(todo => todo.status === 'done').length)/todos.length)*barW);
        console.log(barW);
    },[])

    console.log(done)

    return (
        <div ref={barRef}  className={`absolute flex w-full bottom-0 left-0 ${className}`}>
            <p className={`flex-none w-[${urgent}px] h-20px p-1 bg-darkjeans`}>{urgent}</p>
            <p className={`flex-none w-[${active}px]`}>{active}</p>
            <p className={`flex-none w-[${done}px]`}>{done}</p>
        </div>
    )
}

export default ProgressBar;