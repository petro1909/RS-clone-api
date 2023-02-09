export function getFilterParams(queryParams) {
    const filterParams = Object.assign({}, queryParams);
    delete filterParams.q;
    delete filterParams.sort;
    delete filterParams.order;
    delete filterParams.page;
    delete filterParams.limit;
    return filterParams;
}

export function getSearchParams(queryParams) {
    return queryParams.search;
}

export function getPageParams(queryParams) {
    const pageParams = {};
    if (Number.parseInt(queryParams.page) && Number.parseInt(queryParams.limit)) {
        pageParams.limit = queryParams.limit;
        pageParams.offset = queryParams.limit * (queryParams.page - 1);
    }
    return pageParams;
}
export function getSortParamsArray(queryParams) {
    let sort = queryParams.sort;
    let order = queryParams.order;

    if (Array.isArray(order)) {
        order = order.filter((orderItem) => orderItem === "ASC" || orderItem === "DESC");
    } else if (typeof order === "string" && order !== "ASC" && order !== "DESC") {
        order = null;
    }
    if (!sort || !order) {
        return [];
    }

    if (typeof sort === "string" && typeof order === "string") {
        return [[sort, order]];
    }
    if (Array.isArray(sort) && typeof order === "string") {
        return [[sort[0], order]];
    }
    if (Array.isArray(order) && typeof sort === "string") {
        return [[sort, order[0]]];
    }
    if (Array.isArray(sort) && Array.isArray(order)) {
        const sortLength = sort.length;
        const orderLength = order.length;
        const minLength = Math.min(sortLength, orderLength);

        sort = sort.slice(0, minLength);
        order = order.slice(0, minLength);
        const sortParamsArray = [];
        for (let i = 0; i < minLength; i++) {
            sortParamsArray.push([sort[i], order[i]]);
        }
        return sortParamsArray;
    }
}
