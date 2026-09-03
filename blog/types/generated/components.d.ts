import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    singleImage: Schema.Attribute.Component<'images.image', false>;
  };
}

export interface BlocksRichtext extends Struct.ComponentSchema {
  collectionName: 'components_blocks_richtexts';
  info: {
    displayName: 'Richtext';
  };
  attributes: {
    richtext: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<'plugin::strapi-tiptap-editor.strapi-tiptap-editor'>;
  };
}

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

export interface ImagesImage extends Struct.ComponentSchema {
  collectionName: 'components_images_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imageCaption: Schema.Attribute.Component<'images.image-caption', false>;
    settings: Schema.Attribute.Component<'images.image-settings', false> &
      Schema.Attribute.Required;
  };
}

export interface ImagesImageCaption extends Struct.ComponentSchema {
  collectionName: 'components_images_image_captions';
  info: {
    displayName: 'Image Caption';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    position: Schema.Attribute.Enumeration<['top', 'bottom', 'left', 'right']> &
      Schema.Attribute.DefaultTo<'bottom'>;
  };
}

export interface ImagesImageSettings extends Struct.ComponentSchema {
  collectionName: 'components_images_image_settings';
  info: {
    displayName: 'Image Settings';
  };
  attributes: {
    grayscale: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    imageBorder: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    imageSize: Schema.Attribute.Enumeration<['small', 'medium', 'large']> &
      Schema.Attribute.DefaultTo<'medium'>;
    roundedBorder: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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
      'blocks.image': BlocksImage;
      'blocks.richtext': BlocksRichtext;
      'feature.current-read': FeatureCurrentRead;
      'images.image': ImagesImage;
      'images.image-caption': ImagesImageCaption;
      'images.image-settings': ImagesImageSettings;
      'navigation.nav-link': NavigationNavLink;
    }
  }
}
