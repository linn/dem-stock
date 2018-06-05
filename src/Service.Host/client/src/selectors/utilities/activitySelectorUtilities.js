export const getActivityRootProductUris = activities => {
    if (!activities) {
        return null;
    }

    return activities.items.map(a => a.rootProductUri).filter(r => r !== undefined);
}

export const getActivityEmployeeUris = activities => {
    if (!activities) {
        return null;
    }

    return activities.map(a => a.updatedByUri).filter(e => e !== null);
}

export const getActivitiesUpdating = activities => {
    return !!activities.items.length && activities.loading;
}

export const getActivitiesLoading = activities => {
    return !activities.items.length && activities.loading;
}