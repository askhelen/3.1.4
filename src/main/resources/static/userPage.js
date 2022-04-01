const url = 'http://localhost:8080/index/user';

$(document).ready(); {
    getTableUser()
}

function getTableUser() {
    fetch(url).then(
        response => {
            response.json().then(
                data => {
                    let str = '<tr>' +
                        '<td>' + data.id + '</td>' +
                        '<td>' + data.firstName + '</td>' +
                        '<td>' + data.lastName + '</td>' +
                        '<td>' + data.age + '</td>' +
                        '<td>' + data.email + '</td>' +
                        '<td>' + data.roles.map(role => role.name === 'ROLE_USER' ? 'ROLE_USER' : 'ROLE_ADMIN') + '</td>' +
                        '</tr>';
                    $('#table_user tbody').empty().append(str);
                });
        });
}