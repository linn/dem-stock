export const getEmployeeName = oidc => {    
    if (!oidc || !oidc.user || !oidc.user.profile || !oidc.user.profile.name) {
        return null;
    }

    return oidc.user.profile.name;
}

export const getEmployeeUri = oidc => {    
    if (!oidc || !oidc.user || !oidc.user.profile || !oidc.user.profile.employee) {
        return null;
    }

    return oidc.user.profile.employee;
}
