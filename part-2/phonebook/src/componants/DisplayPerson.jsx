const DisplayPerson = ({name, phone, handleDelete}) => {
     return(
      <div>
        <span>{name} {phone} </span>
        <button onClick={handleDelete}>Delete</button>
      </div>
     )
   }

export default DisplayPerson