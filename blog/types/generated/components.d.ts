import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksDivider extends Struct.ComponentSchema {
  collectionName: 'components_blocks_dividers';
  info: {
    displayName: 'Divider';
  };
  attributes: {
    style: Schema.Attribute.Enumeration<
      ['Dashed', 'Dotted', 'Solid', 'Rounded']
    >;
  };
}

export interface BlocksImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    singleImage: Schema.Attribute.Component<'images.image', false>;
  };
}

export interface BlocksMultipleImages extends Struct.ComponentSchema {
  collectionName: 'components_blocks_multiple_images';
  info: {
    displayName: 'multipleImages';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
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

export interface BlocksYoutube extends Struct.ComponentSchema {
  collectionName: 'components_blocks_youtubes';
  info: {
    displayName: 'youtube';
  };
  attributes: {
    url: Schema.Attribute.String;
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
    visible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface FeatureMomentImage extends Struct.ComponentSchema {
  collectionName: 'components_feature_moment_images';
  info: {
    displayName: 'momentImage';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    visible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
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
      'blocks.divider': BlocksDivider;
      'blocks.image': BlocksImage;
      'blocks.multiple-images': BlocksMultipleImages;
      'blocks.richtext': BlocksRichtext;
      'blocks.youtube': BlocksYoutube;
      'feature.current-read': FeatureCurrentRead;
      'feature.moment-image': FeatureMomentImage;
      'images.image': ImagesImage;
      'images.image-caption': ImagesImageCaption;
      'images.image-settings': ImagesImageSettings;
      'navigation.nav-link': NavigationNavLink;
    }
  }
}
