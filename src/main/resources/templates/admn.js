
const url = 'http://localhost:8080/admin/getAll';

$(document).ready(); {
    fillTable();

}

function fillTable(){
    fetch(url).then(res =>{
        res.json().then(
            data=>{
                console.log(data);
                let res = "";
                data.forEach((user) =>{
                    res += `<tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.role.map(r=>r.role.replace('ROLE_', ' '))}</td>
                            <td class="text-center"><button type="submit" class="btnEdit btn-info active"
                                data-bs-toggle="modal" data-bs-target="#editModal">Изменить</button></td>
                            <td class="text-center"><button type="submit" class="btnDel btn-danger active"
                                data-bs-toggle="modal" data-bs-target="#deleteModal">Удалить</button></td>
                        </tr>`
                })
                document.querySelector("tbody").innerHTML = res;
            }
        )
    })
}

