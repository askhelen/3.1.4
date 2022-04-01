const url = 'http://localhost:8080/admin/getAll';
$(document).ready(); {
    fillTable();
}

function fillTable() {
    fetch(url).then(
        response => {
            response.json().then(
                data => {
                    let temp = "";
                    data.forEach((user) => {
                        temp += "<tr>";
                        temp += "<td>" + user.id + "</td>";
                        temp += "<td>" + user.firstName + "</td>";
                        temp += "<td>" + user.lastName + "</td>";
                        temp += "<td>" + user.age + "</td>";
                        temp += "<td>" + user.email + "</td>";
                        temp += "<td>" + user.roles.map(role => role.name === 'ROLE_USER' ? 'ROLE_USER' : 'ROLE_ADMIN') + "</td>";
                        temp += "<td>" +
                            "<a class='btn btn-info' role='button' onclick='fillEditModal(" + user.id + ")'  data-toggle='modal' data-target='#editModal'>Edit</a>" +
                            "</td>";
                        temp += "<td>" +
                            "<a class='btn btn-danger' role='button' onclick='fillDeleteModal(" + user.id + ")' data-toggle='modal' data-target='#deleteModal'>Delete</a>" +
                            "</td>"
                        temp += "</tr>"
                    })
                    $('table tbody').empty().append(temp);
                });
        });
}

function fillEditModal(id) {
    $.get("/admin/" + id, function (userJSON) {
        $('#idE').val(userJSON.id);
        $('#firstNameE').val(userJSON.firstName);
        $('#lastNameE').val(userJSON.lastName);
        $('#ageE').val(userJSON.age);
        $('#emailE').val(userJSON.email);
        $('#passwordE').val(userJSON.password);
        $('#roleE').val(userJSON.role);
    });
}
function fillDeleteModal(id) {
    $.get("/admin/" + id, function (userJSON) {
        $('#id1').val(userJSON.id);
        $('#firstName1').val(userJSON.firstName);
        $('#lastName1').val(userJSON.lastName);
        $('#age1').val(userJSON.age);
        $('#email1').val(userJSON.email);
        $('#password1').val(userJSON.password);
        $('#role1').val(userJSON.role);
    });
}

$("#btnNewUser").on('click', (event) => {
    event.preventDefault();
    let user = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        age: $("#age").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        role: $("#role option:selected").val()
    };
    $.ajax({
        url: "/admin",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(user)
    })
    setTimeout(() => fillTable(), 200);

});


$("#btnSubmitEdit").on('click', (event) => {
    event.preventDefault();
    let user = {
        id: $("#idE").val(),
        firstName: $("#firstNameE").val(),
        lastName: $("#lastNameE").val(),
        age: $("#ageE").val(),
        email: $("#emailE").val(),
        password: $("#passwordE").val(),
        role: $("#roleE option:selected").val()
    };
    $.ajax({
        url: "/admin/edit",
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(user)
    })
    setTimeout(() => fillTable(), 200);
});

$("#btnSubmitDelete").on('click', (event) => {
    event.preventDefault();
    let id = $("#id1").val();
    $.ajax({
        url: "/admin/delete/" + id,
        type: "DELETE",
        dataType: "text"
    })
    setTimeout(() => fillTable(), 200);
});

