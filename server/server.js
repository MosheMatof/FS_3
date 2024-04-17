// mock of a server uinsg the 'Endpoint' 'FNetwork' and 'FXMLHttpRequest' classes
// import {EndPoint, FNetwork, FXMLHttpRequest} from '../common/index'
// import {DB} from '../db/index'

const db = new DB()

const server = new EndPoint('server', async (data) => {
    try {
        const url = data.url.split('/')
        const resource = url[1]
        const id = url[2]
        if(data.method === 'GET'){
            if(resource === 'employees'){
                //denied access without login
                data.status = 401
                data.responseText = 'access denied'
                return
            } else if(resource === 'goalsReports'){
                    loggedUser = JSON.parse(localStorage.getItem('loggedUser'));                    if(!loggedUser){
                    data.status = 401
                    data.responseText = 'access denied'
                    return
                }
                if(id){
                    const report = db.getGoalsReport(id)
                    if(report && report.employeeId === loggedUser.id){
                        data.status = 200
                        data.responseText = JSON.stringify(report)
                    } else {
                        data.status = 404
                    }
                } else {
                    const reports = db.getGoalsReports(loggedUser.id)
                    data.status = 200
                    data.responseText = JSON.stringify(reports)
                }
            }
        } else if(data.method === 'POST'){
            if(resource === 'signin'){
                const employee = JSON.parse(data.body)
                const index = db.employees.findIndex(e => e.name === employee.name && e.password === employee.password)
                if(index !== -1){
                    data.status = 200
                    data.responseText = JSON.stringify(db.employees[index])
                    //set logged user in the local storage
                    localStorage.setItem('loggedUser', data.responseText)
                } else {
                    data.status = 404
                }
            }
            else if(resource === 'signup'){
                const employee = JSON.parse(data.body)
                db.postEmployee(employee)
                data.status = 201
            }
            else if(resource === 'goalsReports'){
                const report = JSON.parse(data.body)
                db.postGoalsReport(report)
                data.status = 201
            }
        } else if(data.method === 'PUT'){
            if(resource === 'employees'){
                const employee = JSON.parse(data.body)
                db.putEmployee(id, employee)
                data.status = 200
            } else if(resource === 'goalsReports'){
                const report = JSON.parse(data.body)
                db.putGoalsReport(id, report)
                data.status = 200
            }
        } else if(data.method === 'DELETE'){
            if(resource === 'employees'){
                db.deleteEmployee(id)
                data.status = 200
            } else if(resource === 'goalsReports'){
                db.deleteGoalsReport(id)
                data.status = 200
            }
        }
    } catch (error) {
        data.status = 500
        data.responseText = 'internal server error'
    }
})

FNetwork.addEndPoint(server);