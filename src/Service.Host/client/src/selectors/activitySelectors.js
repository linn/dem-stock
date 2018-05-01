import { getRootProductName } from './rootProductsSelectors';

export const getActivities = (activities, rootProducts) => {
    if (!activities || !rootProducts) {
        return null;
    }
    
    let activitiesWithRootProductName = [...activities];
    activitiesWithRootProductName.forEach(a => a.rootProductName = getRootProductName(a.rootProductUri, rootProducts));
    return activitiesWithRootProductName;
}

export const getActivityRootProductUris = (activities) => {
    if (!activities) {
        return null;
    }

    return activities.map(a => a.rootProductUri).filter(r => r !== undefined);
}