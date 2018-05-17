export const getActivityRootProductUris = activities => {    
    if (!activities) {
        return null;
    }

    return activities.map(a => a.rootProductUri).filter(r => r !== undefined);
}

export const getActivityEmployeeUris = activities => {
    if (!activities) {
        return null;
    }

    return activities.map(a => a.updatedByUri).filter(e => e !== null);
}