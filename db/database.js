//API of a mock database on the local storage

class DB {
    constructor(){
        this.employees = localStorage.employees? JSON.parse(localStorage.employees) : [];
        this.goalsReports = localStorage.goalsReports? JSON.parse(localStorage.goalsReports) : [];
    }    
    getEmployee(id) {
        return this.employees.find(employee => employee.id === id);
    }
    getEmployees() {
        return this.employees;
    }
    postEmployee(employee) {
        this.employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(this.employees));
    }
    putEmployee(id, employee) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees[index] = employee;
            localStorage.setItem('employees', JSON.stringify(this.employees));
        }
    }
    deleteEmployee(id) {
        const index = this.employees.findIndex(employee => employee.id === id);
        this.employees.splice(index, 1);
        localStorage.employees = JSON.stringify(this.employees);
    }

    getGoalsReport(id) {
        return this.goalsReports.find(report => report.date === id);
    }

    getGoalsReports(employeeId) {
        return this.goalsReports.filter(report => report.employeeId === employeeId);
    }
    postGoalsReport(report) {
        this.goalsReports.push(report);
        localStorage.goalsReports = JSON.stringify(this.goalsReports);
    }
    putGoalsReport(id, report) {
        const index = this.goalsReports.findIndex(report => report.date === id);
        if (index !== -1) {
            this.goalsReports[index] = report;
            localStorage.goalsReports = JSON.stringify(this.goalsReports);
        }
    }
    deleteGoalsReport(id) {
        const index = this.goalsReports.findIndex(report => report.date === id);
        this.goalsReports.splice(index, 1);
        localStorage.goalsReports = JSON.stringify(this.goalsReports);
    }
}
