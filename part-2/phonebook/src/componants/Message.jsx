const DisplayMessage = ({message, type}) => {
     if (message === '') {
          return (
               <div>
                    {message}
               </div>
          )
        }else{
         if(type === 'success'){
          return (
               <div className='message'>
                    {message}
               </div>
          )
         }else{
          return (
               <div className='error'>
                    {message}
               </div>
          )
         }
        }
}

export default DisplayMessage