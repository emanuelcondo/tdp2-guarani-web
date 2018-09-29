const className = "AUTH-SERVICE-"

export const authUser = (auth) => {
  console.log(className+'login user',auth);
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve()
    },3000)
  })
}