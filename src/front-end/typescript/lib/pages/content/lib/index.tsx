import { prefixPath } from 'front-end/typescript/lib';
import { View } from 'front-end/typescript/lib/framework';
import Link, { routeDest } from 'front-end/typescript/lib/views/link';
import React from 'react';
import { Content } from 'shared/lib/resources/content';
import { adt } from 'shared/lib/types';

export function slugPath(slug: string): string {
  return prefixPath(`content/${slug}`);
}

export const ContentLink: View<Pick<Content, 'title' | 'slug'> & { newTab?: boolean; }> = ({ title, slug, newTab }) => {
  return (<Link newTab dest={routeDest(adt('contentView', slug))}>{title}</Link>);
};
