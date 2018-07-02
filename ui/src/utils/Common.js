export { GetCSRF, isLoggedIn }

function ReadCookie() {
    let allcookies  =  document.cookie.replace(/\s/g, '');
    let cookiearray = allcookies.split(';')
    let output = {}
    // Now take key value pair out of this arrays
    for(let i = 0; i < cookiearray.length; i++) {
      const [name, value] = cookiearray[i].split('=')
      output[name] = value
    }
    return output
 }

function GetCSRF() {
  return ReadCookie().csrftoken
}
