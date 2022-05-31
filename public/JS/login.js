const login_button = document.querySelector(".login-button");
      login_button.addEventListener("click", creatUser);

async function creatUser(){
    const login_email = document.querySelector("#login-email"),
          login_password = document.querySelector("#login-password");


  if(login_email.value != "" || login_password.value != ""){

    console.log(login_password.value, "password")
    console.log(login_email.value, "email")

    myinit = {
      method: 'post',
      mode: 'cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          password: login_password.value,
          email: login_email.value,
      })
  }

  
  try {
    const send = await fetch("http://localhost:3000/login", myinit)
    let data = await send.json()
    

    if(!data.token){
      console.log(data.message)
      
    }else{
      location.href = "/dashboard"
    }

  } catch (error) {

    console.log(error)
    
  }





  }else{  
    login_email.classList.add("borderRed");
    login_password.classList.add("borderRed");
  }

//   /user/login
}