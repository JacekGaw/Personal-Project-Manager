import React, {useContext} from 'react';
import { ProjectsContext } from '../../store/projects-context';
import { useParams } from 'react-router-dom';

const ProjectViewTodos = (todos) => {
    const { projectIDparam } = useParams();
    const {} = useContext(ProjectsContext);
    return (
        <section>
            <ul className='w-full p-2'>
                {todos && todos.todos.map((todo, index) => {
                    return <li key={index} className='text-sm my-1 font-[300] bg-slate-100 p-2 rounded-sm shadow-sm'><span className='font-[700]'>{index+1}.</span> {todo}</li>
                })}
            </ul>
        </section>
    )
}

export default ProjectViewTodos;