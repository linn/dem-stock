export const getActivities = (activities) => {    
    if (!activities) {
        return null;
    }

    return activities;
}

export const getActivityRootProductUris = (activities) => {
    if (!activities) {
        return null;
    }

    return activities.map(a => a.rootProductUri).filter(r => r !== undefined);
}