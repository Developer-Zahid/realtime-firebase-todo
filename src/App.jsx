import { useEffect, useRef, useState } from 'react'
import { getDatabase, ref, set, onValue, update, remove, push } from "firebase/database"


function App() {
  const connectedDB = getDatabase()
  const [editToggle, setEditToggle] = useState(false)
  const [addTodoText, setAddTodoText] = useState('')
  const [savesTodoArray, setSavesTodoArray] = useState([])
  const [currentEditableTodoId, setCurrentEditableTodoId] = useState('')
  const getAddTodoInput = useRef()

  useEffect(()=>{
    onValue(ref(connectedDB, 'todoList'), (getAllData)=>{
      let containTodoArray = []
      getAllData.forEach(item =>{
        containTodoArray.push({...item.val(), id: item.key})
      })
      setSavesTodoArray(containTodoArray)
    })
  }, [])

  let handleChange = (e)=>{
    setAddTodoText(e.target.value)
    console.log(addTodoText);
  }

  let handleTodoSubmit = ()=>{
    if(getAddTodoInput.current.value !== ''){
      set(push(ref(connectedDB, 'todoList')),{
        todoItem: addTodoText
      }).then(()=>{
        console.log('Todo Added');
        getAddTodoInput.current.value = ''
      })
    }else{
      alert("Empty Todo Not Accepted")
    }
  }

  let handleEditTodo = (uniqueTodoId, selectedTodoText)=>{
    setEditToggle(true)
    getAddTodoInput.current.value = selectedTodoText
    setAddTodoText(selectedTodoText)
    setCurrentEditableTodoId(uniqueTodoId)
  }

  let handleRemoveTodo = (uniqueTodoId)=>{
    remove(ref(connectedDB, 'todoList/' + uniqueTodoId))
    .then(()=>{
      console.log('Succesfully Removed !');
    })
  }

  let handleTodoEdit = ()=>{
    if(getAddTodoInput.current.value !== ''){
      update(ref(connectedDB, 'todoList/' + currentEditableTodoId),{
        todoItem: addTodoText
      }).then(()=>{
        setEditToggle(false)
        getAddTodoInput.current.value = ''
        console.log('Succesfully Edited !');
      })
    }else{
      alert("Empty Todo Not Accepted")
    }
  }

  return (
    <div className="todo-card">
      <div className="todo-card__header">
        <input type="text" placeholder='Add todo' className='todo-card__header__input' ref={getAddTodoInput} onChange={handleChange} />
        {
          editToggle ?
          <button type='button' className='todo-card__header__btn' onClick={handleTodoEdit}>Edit</button> :
          <button type='button' className='todo-card__header__btn' onClick={handleTodoSubmit}>Add</button>
        }
      </div>
      <div className="todo-card__body">
        <ol className='todo-card__body__list'>
          {savesTodoArray.map((item, index)=> (
            <li key={item.id} className='todo-card__body__list__item'>
              {item.todoItem}
              <div className='todo-card__body__list__item__btn-group'>
                <button type='button' className='todo-card__body__list__item__btn' onClick={()=>handleEditTodo(item.id, item.todoItem)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>
                <button type='button' className='todo-card__body__list__item__btn' onClick={()=>handleRemoveTodo(item.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default App
