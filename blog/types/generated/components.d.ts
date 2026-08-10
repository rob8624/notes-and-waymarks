import type { Schema, Struct } from '@strapi/strapi';

export interface FeatureCurrentRead extends Struct.ComponentSchema {
  collectionName: 'components_feature_current_reads';
  info: {
    displayName: 'Current Read';
  };
  attributes: {
    author: Schema.Attribute.String;
    bookName: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    summary: Schema.Attribute.Text;
  };
}

export interface NavigationNavLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_links';
  info: {
    displayName: 'NavLink';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'feature.current-read': FeatureCurrentRead;
      'navigation.nav-link': NavigationNavLink;
    }
  }
}
