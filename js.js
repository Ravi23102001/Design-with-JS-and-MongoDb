// backend URL

const getUrl = "http://localhost:5000/users/view";
const upUrl = "http://localhost:5000/users/update"; //?_id=64bbb3b85aff3a8e9a937ae5
const delUrl = "http://localhost:5000/users/delete";  //?_id=64bbb04d2e57f27eea6f264f
const createUrl = "http://localhost:5000/users/create";
// -------------------------------------------------
// get Dom element

let fname = document.getElementById("fname");
let pno = document.getElementById("pno");
let email = document.getElementById("email");
let pass = document.getElementById("pass");
let tblBody = document.getElementById("tblBody");
let btn = document.getElementById("btn");
let upBtn = document.getElementById("UpBtn");
let err = document.getElementById("er")
let eyeBtn=document.getElementById("eye");
// console.log(fname,pno,email,pass,tblBody)
// <------------------------------------>
console.log(fname.value)
btn.addEventListener("click", post)

// table row create 
function createInterface(data) {
    tblBody.innerHTML = "";
    data.forEach(element => {
        let fn = element.name;
        let pn = element.phone;
        let em = element.email;
        let pw = element.password;
        console.log(element)
        let id = element._id;
        // console.log(id)
        let pas="";
        for(i=0; i<pw.length; i++){
            pas+="*";
        }



        let tr = document.createElement("tr")
        tr.innerHTML = `<td>${fn}</td>
    <td>${pn}</td>
    <td>${em}</td>
    <td>${pas}</td>
    <td><button class="btn btn-danger" onclick="del('${id}')" >Delete</button></td>
    <td><button class="btn btn-success" onclick="preUp('${fn}','${pn}','${em}','${pw}','${id}')">Edit</button></td>`;
        tblBody.append(tr);
    });
}

// post method

async function post() {
    let fnam = fname.value.trim();
    let pn = pno.value.trim();
    let mail = email.value.trim();
    let passw = pass.value.trim();
    if (fnam === "" || pn === "" || mail === "" || passw === "") {
        err.style.display = "block";
        err.innerHTML = "Fill Entire Form"
        return
    }
    else {
        err.style.display = "none";
    }
    // console.log(mail.includes("@gmail.com"))
    if (!mail.includes("@gmail.com")) {
        // alert("Enter email valid Format")
        err.style.display = "block";
        err.innerHTML = "Enter Valid Email  Format"
        return
    }
    else {
        err.style.display = "none";
    }
    if (pn.length < 10 || pn.length > 10) {
        // alert("Enter valid phone number")
        err.style.display = "block";
        err.innerHTML = "Enter Valid Phone Number"
        return
    }
    else {
        err.style.display = "none"
    }
    if (passw.length < 8 || passw.length > 8) {
        err.style.display = "block";
        err.innerHTML = "Your password must be  8 characters long, contain only numbers"
        return
    }
    else {
        err.style.display = "none"
    }
    let userObj = { name: fnam, email: mail, phone: pn, password: passw };
    console.log(userObj)

    let userStr = JSON.stringify(userObj);
    console.log(userStr)
    try {
        let option = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: userStr,
        }
        let response = await fetch(createUrl, option)
        console.log(response);
        if (response.ok) {
            let ret = await response.json()
            console.log(ret.data)
            get()

        }
        fname.value = "";
        pno.value = "";
        email.value = "";
        pass.value = "";

    } catch (error) {
        console.log(error)

    }
}

// get

async function get() {
    try {
        let response = await fetch(getUrl);
        let getRes = await response.json();
        console.log(getRes.data)
        createInterface(getRes.data)

    } catch (error) {

        console.log(error)
    }

}
get()

// delete

async function del(id) {
    // alert("hai")
    let option = {
        method: "DELETE",
    }
    try {
        let response = await fetch(`${delUrl}?_id=${id}`, option)
        console.log(response)
        if (response.ok) {
            get()
        }


    } catch (error) {
        console.log(error)

    }

}
upBtn.style.display="none"

// preupdate

function preUp(a, b, c, d, e) {
    btn.style.display="none"
    upBtn.style.display="inline-block"
    console.log(a, b, c, d, e)
    fname.value = a;
    pno.value = b;
    email.value = c;
    pass.value = d;
    upBtn.addEventListener("click", function () {
        let up = { name: fname.value, email: email.value, phone: pno.value, password: pass.value };
        let strUp = JSON.stringify(up)
        console.log(strUp)
        upBtn.style.display="none"
        btn.style.display="inline-block"
        
        update(strUp, e)
    })


}


// update

async function update(up, id) {
    let option = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: up,
    }
    try {
        let response = await fetch(`${upUrl}?_id=${id}`, option)
        console.log(response)
        if (response.ok) {
            get()
            fname.value = "";
            pno.value = "";
            email.value = "";
            pass.value = "";
        }



    } catch (error) {
        console.log(error)

    }
}

// eye btn

pass.addEventListener("focus",testi)
 
function testi(){
eyeBtn.style.display="block";
eyeBtn.addEventListener("mousedown",function(e){
    // pass.value=
    // console.log(e.target.classList)
    // console.log(pass.type)
    if(pass.type=="password"){
        pass.setAttribute("type","text")
        // console.log(pass.attributes)
        eyeBtn.classList.remove("fa-eye")  
         eyeBtn.classList.add("fa-eye-slash")
       
    }


})

eyeBtn.addEventListener("mouseup",function(){
    pass.setAttribute("type","password")
eyeBtn.classList.remove("fa-eye-slash")
eyeBtn.classList.add("fa-eye")
// console.log(pass.type)
})}


// pass.addEventListener("blur",()=>{
//     // eyeBtn.style.display="none"
// })

// eyeBtn.addEventListener("click",function(e){
//     // pass.value=
//     console.log(e.target.classList)
//     console.log(pass.type)
//     if(pass.type=="password"){
//         pass.setAttribute("type","text")
//         // console.log(pass.attributes)
//         eyeBtn.classList.remove("fa-eye")  
//          eyeBtn.classList.add("fa-eye-slash")
       
//     }
//     else{
//         pass.setAttribute("type","password")
//     eyeBtn.classList.remove("fa-eye-slash")
//     eyeBtn.classList.add("fa-eye")
//     console.log(pass.type)
// }

// })