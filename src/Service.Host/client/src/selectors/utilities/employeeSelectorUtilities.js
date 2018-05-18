export const getEmployeeUris = employees => {
    if (!employees) {
        return null;
    }

    return employees.items.map(e => e.href);
}

export const getEmployee = (employeeUri, employees) => {
    if (!employeeUri || !employees) {
        return null;
    }

    return employees.items.find(e => e.href === employeeUri);
}

export const getEmployeeName = (employeeUri, employees) => {
    const employee = getEmployee(employeeUri, employees);
    return employee ? employee.fullName : null;
}