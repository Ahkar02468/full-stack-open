const InputForm = (props) => {
     return(
       <div>
         <form onSubmit={props.handleSubmit}>
           <div>
             name: <input value={props.inputName} onChange={props.handleName}/>
           </div>
           <div>number: <input value={props.inputPh} onChange={props.handlePh}/></div>
           <div>
             <button type="submit">add</button>
           </div>
         </form>
       </div>
     )
   }

export default InputForm