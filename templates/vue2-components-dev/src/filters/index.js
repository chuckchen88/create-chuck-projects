export const reverse = (value) => { 
    return value.split('').reverse().join('') 
}

export const tel2asterisk = (tel) => {
    return tel.substr(0,3) + "****" + tel.substr(7)
}
