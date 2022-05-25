import { useReducer, useRef } from 'react'
import reducer, { initState } from './reducer';
import { setJob, addJob, deleteJob } from './actions'

//useReducer
// 1. Init state 
// 2. Action
// 3. Reducer
//4. Dispatch

function App() {
    const [state, dispatch] = useReducer(reducer, initState)
    const { job, jobs } = state
    const inputRef = useRef()
    const handleSubmit = () => {
        dispatch(addJob(job))
        dispatch(setJob(''))
        inputRef.current.focus()
    }

    return (
        <div style={{ padding: '0 20px' }}>
            <h3>Todo app</h3>
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}>
                <input
                    ref={inputRef}
                    value={job}
                    placeholder="Enter todo..."
                    onChange={e => {
                        console.log(e.target.value)
                        dispatch(setJob(e.target.value))
                    }}
                />
                <button type='submit'>Add</button>
            </form>


            <ul className='jobs'>
                {jobs.map((job, index) => (
                    <li key={index}>
                        {job}
                        <span onClick={() => dispatch(deleteJob(index))}>
                            &times;
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App;
