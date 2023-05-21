
export const changeEmail = (email) => {
 const splitted = email.split("")
 return(splitted.map((item, index) => {
 if(index === 0 || item === "." || item === "@" || splitted[index-1] === "@"){
return(item)
 }
return("*")
 }).join(""))
}