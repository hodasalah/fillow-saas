import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const initialTasks = [
    { id: 1, text: 'Design new landing page', completed: false },
    { id: 2, text: 'Fix navigation bug', completed: true },
    { id: 3, text: 'Write documentation', completed: false },
    { id: 4, text: 'Deploy to staging', completed: false },
];

const TaskWidget: React.FC = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="card-dynamic-bg p-6 rounded-2xl shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[var(--text-dark)]">My Tasks</h3>
                <button className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 flex items-center justify-center transition-colors">
                    <FontAwesomeIcon icon={faPlus} size="xs" />
                </button>
            </div>
            
            <ul className="space-y-3 flex-1">
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-center group cursor-pointer" onClick={() => toggleTask(task.id)}>
                        <div 
                            className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors
                                ${task.completed ? 'bg-purple-500 border-purple-500' : 'border-gray-300 group-hover:border-purple-400'}
                            `}
                        >
                            {task.completed && <FontAwesomeIcon icon={faCheck} className="text-white text-[10px]" />}
                        </div>
                        <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-[var(--text-dark)]'}`}>
                            {task.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskWidget;
