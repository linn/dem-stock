export const getSelfHref = itemWithLinks => {
    return getHref(itemWithLinks, 'self');
}

export const getHref = (itemWithLinks, rel) => {
    if (itemWithLinks && itemWithLinks.links && itemWithLinks.links.length > 0) {
        const link = itemWithLinks.links.find(l => l.rel === rel);

        return link ? link.href : null;
    }

    return null;
}

export const distinct = (array) => {
    return Array.from(new Set(array));
}