
export default  async function makeApiCall(url) {
   const result= await((await fetch(url)).json())
   return result;
}