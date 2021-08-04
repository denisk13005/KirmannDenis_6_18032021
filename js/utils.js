async function getData(){
  let resp = await fetch("index.json")
  let response = await resp.json();  
  try{
  console.log(response);
  return response;
  } catch(error){
    console.log(error);
  }
};
export  { getData};

