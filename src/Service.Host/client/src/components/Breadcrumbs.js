﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { history } from 'react-router';
import { Breadcrumb } from 'react-bootstrap';
import { toTitleCase, isUpperCase } from '../helpers/strings';

export const BreadcrumbItem = ({ caption, href, onClick }) => (
    <Breadcrumb.Item href={href} onClick={e => onClick(e)} >
        {isUpperCase(caption) ? caption : toTitleCase(caption)}
    </Breadcrumb.Item>
);

class Breadcrumbs extends Component {

    render() {
        const { location, history, rootPathLength = 2 } = this.props;
        let path = location.pathname;
        if (path.indexOf('/report') > -1) {
            path = path.substring(0, path.indexOf('/report'));
        }

        const crumbs = path
            .split('/')
            .reduce((sofar, crumb, i, crumbs) => {
                const path = crumbs.slice(0, i + 1);
                const href = path.join('/') || '/';

                const handleClick = e => {
                    // we should just let the browser handle any paths 
                    // shorter than our root path, e.g.the 'Home' path
                    if (path.length > rootPathLength && isNaN(path[path.length-1])) {
                        e.preventDefault();
                        history.push(href);
                    }
                };

                return [
                    ...sofar,
                    <BreadcrumbItem key={i} caption={crumb || 'Home'} href={href} onClick={e => handleClick(e)} />
                ];
            }, []);

        return (
            <Breadcrumb>
                {crumbs}
            </Breadcrumb>
        );
    }
}

export default Breadcrumbs;
