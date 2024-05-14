const ShowFilter = (props) => {
     return(
       <>
         <span>Filer shown with </span>
         <input value={props.value} onChange={props.handleOnChange}/>
       </>
     )
 }

 export default ShowFilter